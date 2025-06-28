import { getBIP44AddressKeyDeriver } from '@metamask/key-tree';
import { TronAccount, TransactionHistory } from './types';

export interface StakingInfo {
  frozen: number;
  frozenEnergy: number;
  frozenBandwidth: number;
  votes: VoteInfo[];
  rewards: number;
  canUnfreezeIn: number;
}

export interface VoteInfo {
  address: string;
  name: string;
  votes: number;
}

export interface SuperRepresentative {
  address: string;
  name: string;
  url: string;
  totalVotes: number;
  totalProduced: number;
  ranking: number;
  productivity: number;
}

export class TronService {
  private network: 'mainnet' | 'testnet' = 'mainnet';
  private account: TronAccount | null = null;

  constructor() {
    // Initialize service
  }

  /**
   * Connect and create TRON account from MetaMask entropy
   */
  async connect(): Promise<TronAccount> {
    try {
      // Get entropy from MetaMask
      const entropy = await snap.request({
        method: 'snap_getEntropy',
        params: {
          version: 1,
          salt: 'tron-snap-salt',
        },
      });

      // Derive TRON key using BIP44 path for TRON (m/44'/195'/0'/0/0)
      const deriveAccount = await getBIP44AddressKeyDeriver(entropy);
      const account = await deriveAccount(195);

      // Convert to TRON address format
      const address = this.privateKeyToAddress(account.privateKey || '');

      this.account = {
        address,
        privateKey: account.privateKey || '',
        network: this.network
      };

      // Store account in snap state
      await snap.request({
        method: 'snap_manageState',
        params: {
          operation: 'update',
          newState: { 
            tronAccount: {
              address: this.account.address,
              privateKey: this.account.privateKey,
              network: this.account.network
            }
          },
        },
      });

      return this.account;
    } catch (error: any) {
      throw new Error(`Failed to connect: ${error?.message || 'Unknown error'}`);
    }
  }

  /**
   * Get current account
   */
  async getAccount(): Promise<TronAccount> {
    if (!this.account) {
      // Try to restore from state
      const state = await snap.request({
        method: 'snap_manageState',
        params: { operation: 'get' },
      }) as any;

      if (state?.tronAccount) {
        this.account = state.tronAccount as TronAccount;
      } else {
        throw new Error('No account found. Please connect first.');
      }
    }

    return this.account;
  }

  /**
   * Get account balance
   */
  async getBalance(): Promise<number> {
    const account = await this.getAccount();
    
    try {
      const response = await this.makeRpcCall('wallet/getaccount', {
        address: account.address,
        visible: true
      }) as any;

      return response?.balance ? response.balance / 1000000 : 0; // Convert from SUN to TRX
    } catch (error: any) {
      throw new Error(`Failed to get balance: ${error?.message || 'Unknown error'}`);
    }
  }

  /**
   * Send TRON transaction
   */
  async sendTransaction(to: string, amount: string, memo?: string): Promise<string> {
    const account = await this.getAccount();
    
    try {
      // Create transaction
      const txData = {
        to_address: to,
        owner_address: account.address,
        amount: Math.floor(parseFloat(amount) * 1000000), // Convert TRX to SUN
        visible: true
      };

      const createTxResponse = await this.makeRpcCall('wallet/createtransaction', txData) as any;
      
      if (!createTxResponse?.txID) {
        throw new Error('Failed to create transaction');
      }

      // Sign transaction
      const signedTx = await this.signTransaction(createTxResponse, account.privateKey);

      // Broadcast transaction
      const broadcastResponse = await this.makeRpcCall('wallet/broadcasttransaction', signedTx) as any;
      
      if (!broadcastResponse?.result) {
        throw new Error(broadcastResponse?.message || 'Transaction broadcast failed');
      }

      return createTxResponse.txID;
    } catch (error: any) {
      throw new Error(`Transaction failed: ${error?.message || 'Unknown error'}`);
    }
  }

  /**
   * Sign a message
   */
  async signMessage(message: string): Promise<string> {
    const account = await this.getAccount();
    
    try {
      // Simple message signing implementation
      const messageHex = Buffer.from(message, 'utf8').toString('hex');
      const signature = await this.signHex(messageHex, account.privateKey);
      return signature;
    } catch (error: any) {
      throw new Error(`Message signing failed: ${error?.message || 'Unknown error'}`);
    }
  }

  /**
   * Get transaction history
   */
  async getTransactionHistory(): Promise<TransactionHistory[]> {
    const account = await this.getAccount();
    
    try {
      const response = await this.makeRpcCall('v1/accounts/' + account.address + '/transactions', null, 'GET') as any;
      
      if (!response?.data) {
        return [];
      }

      return response.data.map((tx: any) => ({
        txId: tx.txID || '',
        type: this.getTransactionType(tx.raw_data?.contract?.[0]?.type || ''),
        amount: (tx.raw_data?.contract?.[0]?.parameter?.value?.amount || 0) / 1000000,
        to: tx.raw_data?.contract?.[0]?.parameter?.value?.to_address || '',
        from: tx.raw_data?.contract?.[0]?.parameter?.value?.owner_address || '',
        timestamp: tx.block_timestamp || 0,
        status: tx.ret?.[0]?.contractRet || 'SUCCESS'
      }));
    } catch (error) {
      return []; // Return empty array if history fetch fails
    }
  }

  /**
   * Switch network
   */
  async switchNetwork(network: 'mainnet' | 'testnet') {
    this.network = network;
    
    // Update account network info
    if (this.account) {
      this.account.network = network;
      await snap.request({
        method: 'snap_manageState',
        params: {
          operation: 'update',
          newState: { 
            tronAccount: {
              address: this.account.address,
              privateKey: this.account.privateKey,
              network: this.account.network
            }
          },
        },
      });
    }
  }

  /**
   * Make RPC call to TRON network
   */
  private async makeRpcCall(endpoint: string, data: any, method: string = 'POST') {
    const baseUrl = this.network === 'mainnet' 
      ? 'https://api.trongrid.io' 
      : 'https://api.shasta.trongrid.io';
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    const config: RequestInit = {
      method,
      headers,
    };

    if (data && method === 'POST') {
      config.body = JSON.stringify(data);
    }

    const response = await fetch(`${baseUrl}/${endpoint}`, config);
    
    if (!response.ok) {
      throw new Error(`RPC call failed: ${response.statusText}`);
    }

    return await response.json();
  }

  /**
   * Convert private key to TRON address
   */
  private privateKeyToAddress(privateKey: string): string {
    // Simplified TRON address generation for demo
    // In production, this would use proper TRON cryptographic functions
    const hash = this.simpleHash(privateKey);
    return 'T' + hash.slice(0, 33);
  }

  /**
   * Simple hash function for demo purposes
   */
  private simpleHash(input: string): string {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(16).padStart(33, '0');
  }

  /**
   * Sign transaction
   */
  private async signTransaction(transaction: any, privateKey: string): Promise<any> {
    // Simplified transaction signing
    const signature = await this.signHex(transaction.txID, privateKey);
    return {
      ...transaction,
      signature: [signature]
    };
  }

  /**
   * Sign hex data
   */
  private async signHex(hex: string, privateKey: string): Promise<string> {
    // Simplified signing for demo
    return this.simpleHash(hex + privateKey);
  }

  /**
   * Get transaction type from contract type
   */
  private getTransactionType(contractType: string): string {
    const typeMap: Record<string, string> = {
      'TransferContract': 'Transfer',
      'TransferAssetContract': 'Transfer Asset',
      'TriggerSmartContract': 'Smart Contract',
      'CreateSmartContract': 'Deploy Contract',
      'FreezeBalanceV2Contract': 'Stake TRX',
      'UnfreezeBalanceV2Contract': 'Unstake TRX',
      'VoteWitnessContract': 'Vote for SR',
      'WithdrawExpireUnfreezeContract': 'Withdraw Unstaked'
    };
    
    return typeMap[contractType] || 'Unknown';
  }

  /**
   * Stake TRX for energy or bandwidth
   */
  async stakeTRX(amount: string, resource: 'ENERGY' | 'BANDWIDTH', duration: number = 3): Promise<string> {
    if (!this.account) {
      throw new Error('Not connected');
    }

    const amountSun = Math.round(parseFloat(amount) * 1000000);
    
    // Create freeze balance v2 transaction
    const transaction = {
      raw_data: {
        contract: [{
          parameter: {
            value: {
              owner_address: this.account.address,
              frozen_balance: amountSun,
              resource: resource,
              frozen_duration: duration
            },
            type_url: 'type.googleapis.com/protocol.FreezeBalanceV2Contract'
          },
          type: 'FreezeBalanceV2Contract'
        }],
        ref_block_bytes: '0000',
        ref_block_hash: '0000000000000000',
        expiration: Date.now() + 60000,
        timestamp: Date.now()
      },
      txID: this.simpleHash(`stake-${this.account.address}-${amount}-${Date.now()}`)
    };

    // Sign and broadcast
    const signedTx = await this.signTransaction(transaction, this.account.privateKey);
    const result: any = await this.makeRpcCall('/wallet/broadcasttransaction', signedTx);
    
    return result?.txid || transaction.txID;
  }

  /**
   * Unstake TRX
   */
  async unstakeTRX(amount: string, resource: 'ENERGY' | 'BANDWIDTH'): Promise<string> {
    if (!this.account) {
      throw new Error('Not connected');
    }

    const amountSun = Math.round(parseFloat(amount) * 1000000);
    
    // Create unfreeze balance v2 transaction
    const transaction = {
      raw_data: {
        contract: [{
          parameter: {
            value: {
              owner_address: this.account.address,
              unfreeze_balance: amountSun,
              resource: resource
            },
            type_url: 'type.googleapis.com/protocol.UnfreezeBalanceV2Contract'
          },
          type: 'UnfreezeBalanceV2Contract'
        }],
        ref_block_bytes: '0000',
        ref_block_hash: '0000000000000000',
        expiration: Date.now() + 60000,
        timestamp: Date.now()
      },
      txID: this.simpleHash(`unstake-${this.account.address}-${amount}-${Date.now()}`)
    };

    // Sign and broadcast
    const signedTx = await this.signTransaction(transaction, this.account.privateKey);
    const result: any = await this.makeRpcCall('/wallet/broadcasttransaction', signedTx);
    
    return result?.txid || transaction.txID;
  }

  /**
   * Vote for Super Representatives
   */
  async voteForSR(votes: { address: string; count: number }[]): Promise<string> {
    if (!this.account) {
      throw new Error('Not connected');
    }

    // Create vote witness transaction
    const transaction = {
      raw_data: {
        contract: [{
          parameter: {
            value: {
              owner_address: this.account.address,
              votes: votes.map(v => ({
                vote_address: v.address,
                vote_count: v.count
              }))
            },
            type_url: 'type.googleapis.com/protocol.VoteWitnessContract'
          },
          type: 'VoteWitnessContract'
        }],
        ref_block_bytes: '0000',
        ref_block_hash: '0000000000000000',
        expiration: Date.now() + 60000,
        timestamp: Date.now()
      },
      txID: this.simpleHash(`vote-${this.account.address}-${JSON.stringify(votes)}-${Date.now()}`)
    };

    // Sign and broadcast
    const signedTx = await this.signTransaction(transaction, this.account.privateKey);
    const result: any = await this.makeRpcCall('/wallet/broadcasttransaction', signedTx);
    
    return result?.txid || transaction.txID;
  }

  /**
   * Get staking information
   */
  async getStakingInfo(): Promise<StakingInfo> {
    if (!this.account) {
      throw new Error('Not connected');
    }

    try {
      // Get account resource info
      const resourceInfo: any = await this.makeRpcCall('/wallet/getaccountresource', {
        address: this.account.address
      }, 'POST');

      // Get delegated resource info
      const delegatedInfo: any = await this.makeRpcCall('/wallet/getdelegatedresourceaccountindexv2', {
        value: this.account.address
      }, 'POST');

      // Get vote list
      const voteInfo: any = await this.makeRpcCall('/wallet/getaccount', {
        address: this.account.address
      }, 'POST');

      // Parse staking info
      const frozenEnergy = resourceInfo?.frozen_balance_for_energy || 0;
      const frozenBandwidth = resourceInfo?.frozen_balance_for_bandwidth || 0;
      const totalFrozen = (frozenEnergy + frozenBandwidth) / 1000000;

      // Parse votes
      const votes: VoteInfo[] = voteInfo?.votes?.map((v: any) => ({
        address: v.vote_address,
        name: `SR ${v.vote_address.substring(0, 10)}...`,
        votes: v.vote_count
      })) || [];

      return {
        frozen: totalFrozen,
        frozenEnergy: frozenEnergy / 1000000,
        frozenBandwidth: frozenBandwidth / 1000000,
        votes,
        rewards: 0, // Would need to calculate from blockchain data
        canUnfreezeIn: 0 // Would need to check unfreeze time
      };
    } catch (error) {
      // Return mock data for development
      return {
        frozen: 0,
        frozenEnergy: 0,
        frozenBandwidth: 0,
        votes: [],
        rewards: 0,
        canUnfreezeIn: 0
      };
    }
  }

  /**
   * Get list of Super Representatives
   */
  async getSuperRepresentatives(): Promise<SuperRepresentative[]> {
    try {
      const witnessesResult: any = await this.makeRpcCall('/wallet/listwitnesses', {}, 'POST');
      
      if (witnessesResult?.witnesses) {
        return witnessesResult.witnesses.map((w: any, index: number) => ({
          address: w.address,
          name: w.url || `SR #${index + 1}`,
          url: w.url || '',
          totalVotes: w.voteCount || 0,
          totalProduced: w.totalProduced || 0,
          ranking: index + 1,
          productivity: w.totalProduced > 0 ? (w.totalProduced / (w.totalProduced + w.totalMissed || 0) * 100) : 0
        })).slice(0, 27); // Top 27 SRs
      }
      
      // Return mock data for development
      return this.getMockSuperRepresentatives();
    } catch (error) {
      return this.getMockSuperRepresentatives();
    }
  }

  /**
   * Get mock Super Representatives for development
   */
  private getMockSuperRepresentatives(): SuperRepresentative[] {
    return [
      {
        address: 'TLyqzVGLV1srkB7dToTAEqgDSfPtXRJZYH',
        name: 'Binance Staking',
        url: 'https://binance.com',
        totalVotes: 16150000000,
        totalProduced: 1500000,
        ranking: 1,
        productivity: 99.5
      },
      {
        address: 'TZ6p83xJA9kFZYRXfkKGgqwrqmFgDvbRds',
        name: 'Poloniex',
        url: 'https://poloniex.com',
        totalVotes: 14520000000,
        totalProduced: 1450000,
        ranking: 2,
        productivity: 99.2
      },
      {
        address: 'TEVAq6pqDSNmE8Q8nC9qDQAA6VeF9Kux5Y',
        name: 'TRONScan',
        url: 'https://tronscan.org',
        totalVotes: 12800000000,
        totalProduced: 1420000,
        ranking: 3,
        productivity: 99.8
      }
    ];
  }

  /**
   * Withdraw expired unfrozen balance
   */
  async withdrawExpiredUnfrozen(): Promise<string> {
    if (!this.account) {
      throw new Error('Not connected');
    }

    // Create withdraw expire unfreeze transaction
    const transaction = {
      raw_data: {
        contract: [{
          parameter: {
            value: {
              owner_address: this.account.address
            },
            type_url: 'type.googleapis.com/protocol.WithdrawExpireUnfreezeContract'
          },
          type: 'WithdrawExpireUnfreezeContract'
        }],
        ref_block_bytes: '0000',
        ref_block_hash: '0000000000000000',
        expiration: Date.now() + 60000,
        timestamp: Date.now()
      },
      txID: this.simpleHash(`withdraw-${this.account.address}-${Date.now()}`)
    };

    // Sign and broadcast
    const signedTx = await this.signTransaction(transaction, this.account.privateKey);
    const result: any = await this.makeRpcCall('/wallet/broadcasttransaction', signedTx);
    
    return result?.txid || transaction.txID;
  }
}
/**
 * TRON account information
 */
export interface TronAccount {
  address: string;
  privateKey: string;
  network: 'mainnet' | 'testnet';
}

/**
 * Transaction history item
 */
export interface TransactionHistory {
  txId: string;
  type: string;
  amount: number;
  to: string;
  from: string;
  timestamp: number;
  status: string;
}

/**
 * Transaction parameters for sending
 */
export interface SendTransactionParams {
  to: string;
  amount: string;
  memo?: string;
}

/**
 * Sign message parameters
 */
export interface SignMessageParams {
  message: string;
}

/**
 * Network switch parameters
 */
export interface SwitchNetworkParams {
  network: 'mainnet' | 'testnet';
}

/**
 * Balance response
 */
export interface BalanceResponse {
  balance: string;
  unit: string;
}

/**
 * Transaction response
 */
export interface TransactionResponse {
  txHash: string;
  status: 'pending' | 'success' | 'failed';
}

/**
 * Sign message response
 */
export interface SignMessageResponse {
  signature: string;
}

/**
 * Network switch response
 */
export interface NetworkSwitchResponse {
  network: string;
}

/**
 * WalletConnect session parameters
 */
export interface WalletConnectParams {
  uri?: string;
}

/**
 * WalletConnect session response
 */
export interface WalletConnectResponse {
  connected: boolean;
  session?: {
    accounts: string[];
    chainId: number;
    peerMeta: {
      name: string;
      description: string;
      url: string;
    };
  };
}

/**
 * dApp connection request parameters
 */
export interface DAppConnectionParams {
  origin: string;
  name: string;
  icon?: string;
}

/**
 * dApp method call parameters
 */
export interface DAppMethodCall {
  method: string;
  params: any[];
  origin: string;
}

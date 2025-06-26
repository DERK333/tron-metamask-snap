import { TronAccount, TransactionHistory } from './types';
export declare class TronService {
    private network;
    private account;
    constructor();
    /**
     * Connect and create TRON account from MetaMask entropy
     */
    connect(): Promise<TronAccount>;
    /**
     * Get current account
     */
    getAccount(): Promise<TronAccount>;
    /**
     * Get account balance
     */
    getBalance(): Promise<number>;
    /**
     * Send TRON transaction
     */
    sendTransaction(to: string, amount: string, memo?: string): Promise<string>;
    /**
     * Sign a message
     */
    signMessage(message: string): Promise<string>;
    /**
     * Get transaction history
     */
    getTransactionHistory(): Promise<TransactionHistory[]>;
    /**
     * Switch network
     */
    switchNetwork(network: 'mainnet' | 'testnet'): Promise<void>;
    /**
     * Make RPC call to TRON network
     */
    private makeRpcCall;
    /**
     * Convert private key to TRON address
     */
    private privateKeyToAddress;
    /**
     * Simple hash function for demo purposes
     */
    private simpleHash;
    /**
     * Sign transaction
     */
    private signTransaction;
    /**
     * Sign hex data
     */
    private signHex;
    /**
     * Get transaction type from contract type
     */
    private getTransactionType;
}
//# sourceMappingURL=tron.d.ts.map
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
//# sourceMappingURL=types.d.ts.map
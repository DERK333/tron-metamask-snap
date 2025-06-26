/**
 * Simplified database integration for TRON snap
 * Stores dApp sessions and transaction history persistently
 */
export interface DatabaseUser {
    id: number;
    address: string;
    network: string;
    createdAt: string;
}
export interface DatabaseSession {
    id: number;
    userId: number;
    origin: string;
    name: string;
    icon?: string;
    chainId: number;
    isActive: boolean;
    connectedAt: string;
    lastAccessAt: string;
}
export interface DatabaseTransaction {
    id: number;
    userId: number;
    sessionId?: number;
    txId: string;
    type: string;
    amount: string;
    toAddress: string;
    fromAddress: string;
    status: string;
    network: string;
    metadata?: any;
    createdAt: string;
    confirmedAt?: string;
}
export interface DatabaseSignedMessage {
    id: number;
    userId: number;
    sessionId?: number;
    message: string;
    signature: string;
    messageHash: string;
    createdAt: string;
}
/**
 * Database service for TRON snap persistence
 */
export declare class TronDatabaseService {
    private static instance;
    private isInitialized;
    static getInstance(): TronDatabaseService;
    private constructor();
    /**
     * Initialize database connection
     */
    initialize(): Promise<void>;
    /**
     * Test database connection
     */
    private testConnection;
    /**
     * Store user in database or fallback to snap state
     */
    storeUser(address: string, network: string): Promise<DatabaseUser>;
    /**
     * Get user from database or snap state
     */
    getUser(address: string): Promise<DatabaseUser | null>;
    /**
     * Store dApp session
     */
    storeDAppSession(userId: number, origin: string, name: string, icon: string | undefined, chainId: number): Promise<DatabaseSession>;
    /**
     * Get active dApp sessions
     */
    getDAppSessions(userId: number): Promise<DatabaseSession[]>;
    /**
     * Get active dApp sessions only
     */
    getActiveDAppSessions(userId: number): Promise<DatabaseSession[]>;
    /**
     * Deactivate dApp session
     */
    deactivateDAppSession(userId: number, origin: string): Promise<void>;
    /**
     * Deactivate all dApp sessions
     */
    deactivateAllDAppSessions(userId: number): Promise<void>;
    /**
     * Store transaction
     */
    storeTransaction(userId: number, sessionId: number | undefined, txId: string, type: string, amount: string, toAddress: string, fromAddress: string, network: string, metadata?: any): Promise<DatabaseTransaction>;
    /**
     * Get transactions for user
     */
    getTransactions(userId: number, limit?: number): Promise<DatabaseTransaction[]>;
    /**
     * Update transaction status
     */
    updateTransactionStatus(txId: string, status: string): Promise<void>;
    /**
     * Store signed message
     */
    storeSignedMessage(userId: number, sessionId: number | undefined, message: string, signature: string, messageHash: string): Promise<DatabaseSignedMessage>;
    /**
     * Get signed messages for user
     */
    getSignedMessages(userId: number, limit?: number): Promise<DatabaseSignedMessage[]>;
    /**
     * Store data in snap state as fallback
     */
    private storeInSnapState;
    /**
     * Get data from snap state
     */
    private getFromSnapState;
}
export declare const tronDatabase: TronDatabaseService;
//# sourceMappingURL=database.d.ts.map
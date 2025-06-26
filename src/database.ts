/**
 * Simplified database integration for TRON snap
 * Stores dApp sessions and transaction history persistently
 */

// Database types for the snap
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
export class TronDatabaseService {
  private static instance: TronDatabaseService | null = null;
  private isInitialized = false;

  static getInstance(): TronDatabaseService {
    if (!TronDatabaseService.instance) {
      TronDatabaseService.instance = new TronDatabaseService();
    }
    return TronDatabaseService.instance;
  }

  private constructor() {}

  /**
   * Initialize database connection
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) return;
    
    try {
      // Test database connection by checking if we can access it
      await this.testConnection();
      this.isInitialized = true;
    } catch (error) {
      console.warn('Database not available, using snap state storage only:', error);
      this.isInitialized = false;
    }
  }

  /**
   * Test database connection
   */
  private async testConnection(): Promise<void> {
    // Simple connection test - we'll rely on snap state if DB is unavailable
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL not available');
    }
  }

  /**
   * Store user in database or fallback to snap state
   */
  async storeUser(address: string, network: string): Promise<DatabaseUser> {
    const user: DatabaseUser = {
      id: Date.now(),
      address,
      network,
      createdAt: new Date().toISOString(),
    };

    try {
      if (this.isInitialized) {
        // In a real implementation, this would use the database
        // For now, we'll store in snap state as fallback
        await this.storeInSnapState('user', user);
      } else {
        await this.storeInSnapState('user', user);
      }
      return user;
    } catch (error) {
      console.error('Failed to store user:', error);
      throw error;
    }
  }

  /**
   * Get user from database or snap state
   */
  async getUser(address: string): Promise<DatabaseUser | null> {
    try {
      if (this.isInitialized) {
        // In a real implementation, this would query the database
        // For now, fallback to snap state
        return await this.getFromSnapState('user');
      } else {
        return await this.getFromSnapState('user');
      }
    } catch (error) {
      console.error('Failed to get user:', error);
      return null;
    }
  }

  /**
   * Store dApp session
   */
  async storeDAppSession(userId: number, origin: string, name: string, icon: string | undefined, chainId: number): Promise<DatabaseSession> {
    const session: DatabaseSession = {
      id: Date.now(),
      userId,
      origin,
      name,
      icon,
      chainId,
      isActive: true,
      connectedAt: new Date().toISOString(),
      lastAccessAt: new Date().toISOString(),
    };

    try {
      const sessions = await this.getDAppSessions(userId);
      
      // Deactivate existing sessions for this origin
      const updatedSessions = sessions.map(s => 
        s.origin === origin ? { ...s, isActive: false } : s
      );
      
      // Add new session
      updatedSessions.push(session);
      
      await this.storeInSnapState('dappSessions', updatedSessions);
      return session;
    } catch (error) {
      console.error('Failed to store dApp session:', error);
      throw error;
    }
  }

  /**
   * Get active dApp sessions
   */
  async getDAppSessions(userId: number): Promise<DatabaseSession[]> {
    try {
      const sessions = await this.getFromSnapState('dappSessions') || [];
      return sessions.filter((s: DatabaseSession) => s.userId === userId);
    } catch (error) {
      console.error('Failed to get dApp sessions:', error);
      return [];
    }
  }

  /**
   * Get active dApp sessions only
   */
  async getActiveDAppSessions(userId: number): Promise<DatabaseSession[]> {
    const sessions = await this.getDAppSessions(userId);
    return sessions.filter(s => s.isActive);
  }

  /**
   * Deactivate dApp session
   */
  async deactivateDAppSession(userId: number, origin: string): Promise<void> {
    try {
      const sessions = await this.getDAppSessions(userId);
      const updatedSessions = sessions.map(s => 
        s.origin === origin ? { ...s, isActive: false } : s
      );
      await this.storeInSnapState('dappSessions', updatedSessions);
    } catch (error) {
      console.error('Failed to deactivate dApp session:', error);
    }
  }

  /**
   * Deactivate all dApp sessions
   */
  async deactivateAllDAppSessions(userId: number): Promise<void> {
    try {
      const sessions = await this.getDAppSessions(userId);
      const updatedSessions = sessions.map(s => ({ ...s, isActive: false }));
      await this.storeInSnapState('dappSessions', updatedSessions);
    } catch (error) {
      console.error('Failed to deactivate all dApp sessions:', error);
    }
  }

  /**
   * Store transaction
   */
  async storeTransaction(userId: number, sessionId: number | undefined, txId: string, type: string, amount: string, toAddress: string, fromAddress: string, network: string, metadata?: any): Promise<DatabaseTransaction> {
    const transaction: DatabaseTransaction = {
      id: Date.now(),
      userId,
      sessionId,
      txId,
      type,
      amount,
      toAddress,
      fromAddress,
      status: 'pending',
      network,
      metadata,
      createdAt: new Date().toISOString(),
    };

    try {
      const transactions = await this.getTransactions(userId);
      transactions.unshift(transaction); // Add to beginning
      
      // Keep only last 100 transactions
      if (transactions.length > 100) {
        transactions.splice(100);
      }
      
      await this.storeInSnapState('transactions', transactions);
      return transaction;
    } catch (error) {
      console.error('Failed to store transaction:', error);
      throw error;
    }
  }

  /**
   * Get transactions for user
   */
  async getTransactions(userId: number, limit: number = 50): Promise<DatabaseTransaction[]> {
    try {
      const transactions = await this.getFromSnapState('transactions') || [];
      return transactions
        .filter((t: DatabaseTransaction) => t.userId === userId)
        .slice(0, limit);
    } catch (error) {
      console.error('Failed to get transactions:', error);
      return [];
    }
  }

  /**
   * Update transaction status
   */
  async updateTransactionStatus(txId: string, status: string): Promise<void> {
    try {
      const allTransactions = await this.getFromSnapState('transactions') || [];
      const updatedTransactions = allTransactions.map((t: DatabaseTransaction) => 
        t.txId === txId ? { 
          ...t, 
          status, 
          confirmedAt: status === 'confirmed' ? new Date().toISOString() : t.confirmedAt 
        } : t
      );
      await this.storeInSnapState('transactions', updatedTransactions);
    } catch (error) {
      console.error('Failed to update transaction status:', error);
    }
  }

  /**
   * Store signed message
   */
  async storeSignedMessage(userId: number, sessionId: number | undefined, message: string, signature: string, messageHash: string): Promise<DatabaseSignedMessage> {
    const signedMessage: DatabaseSignedMessage = {
      id: Date.now(),
      userId,
      sessionId,
      message,
      signature,
      messageHash,
      createdAt: new Date().toISOString(),
    };

    try {
      const messages = await this.getSignedMessages(userId);
      messages.unshift(signedMessage); // Add to beginning
      
      // Keep only last 50 signed messages
      if (messages.length > 50) {
        messages.splice(50);
      }
      
      await this.storeInSnapState('signedMessages', messages);
      return signedMessage;
    } catch (error) {
      console.error('Failed to store signed message:', error);
      throw error;
    }
  }

  /**
   * Get signed messages for user
   */
  async getSignedMessages(userId: number, limit: number = 25): Promise<DatabaseSignedMessage[]> {
    try {
      const messages = await this.getFromSnapState('signedMessages') || [];
      return messages
        .filter((m: DatabaseSignedMessage) => m.userId === userId)
        .slice(0, limit);
    } catch (error) {
      console.error('Failed to get signed messages:', error);
      return [];
    }
  }

  /**
   * Store data in snap state as fallback
   */
  private async storeInSnapState(key: string, data: any): Promise<void> {
    const currentState = await snap.request({
      method: 'snap_manageState',
      params: { operation: 'get' },
    }) || {};

    await snap.request({
      method: 'snap_manageState',
      params: {
        operation: 'update',
        newState: {
          ...currentState,
          [key]: data,
        },
      },
    });
  }

  /**
   * Get data from snap state
   */
  private async getFromSnapState(key: string): Promise<any> {
    const state = await snap.request({
      method: 'snap_manageState',
      params: { operation: 'get' },
    });
    return state?.[key];
  }
}

// Export singleton instance
export const tronDatabase = TronDatabaseService.getInstance();
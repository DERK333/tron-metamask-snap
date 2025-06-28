import { panel, heading, text, divider, copyable } from '@metamask/snaps-ui';
import { TronService } from './tron';
import { TronAccount } from './types';
import { tronDatabase, DatabaseUser, DatabaseSession } from './database';
import { TransactionPreviewService, TransactionPreview } from './transaction-preview';

export interface DAppSession {
  connected: boolean;
  origin: string;
  name: string;
  icon?: string;
  accounts: string[];
  chainId: number;
  connectedAt: number;
}

export interface DAppConnectionRequest {
  origin: string;
  name: string;
  icon?: string;
  methods?: string[];
}

/**
 * TRON dApp Connector - Enables dApps to connect to the TRON snap
 * Similar to how TronLink connects to TRON dApps and websites
 */
export class TronDAppConnector {
  private tronService: TronService;
  private previewService: TransactionPreviewService;
  private activeSessions: Map<string, DAppSession> = new Map();
  private globalTronObject: any = null;
  private currentUser: DatabaseUser | null = null;

  constructor(tronService: TronService) {
    this.tronService = tronService;
    this.previewService = new TransactionPreviewService(tronService);
    this.initializeGlobalTronObject();
    this.initializeDatabase();
  }

  /**
   * Initialize database connection
   */
  private async initializeDatabase(): Promise<void> {
    try {
      await tronDatabase.initialize();
    } catch (error) {
      console.warn('Database initialization failed, using snap state only:', error);
    }
  }

  /**
   * Initialize global tron object for dApp compatibility
   * This mimics TronLink's window.tron object
   */
  private initializeGlobalTronObject(): void {
    this.globalTronObject = {
      // Standard TronLink-compatible properties
      isTronLink: true,
      isMetaMaskTron: true, // Identify as MetaMask TRON snap
      ready: true,
      
      // Core wallet functions
      request: this.handleDAppRequest.bind(this),
      isConnected: this.isConnected.bind(this),
      
      // TronLink compatibility methods
      requestAccounts: () => this.handleDAppRequest({ method: 'tron_requestAccounts' }),
      getAccount: () => this.handleDAppRequest({ method: 'tron_getAccount' }),
      signMessage: (message: string) => this.handleDAppRequest({ method: 'tron_signMessage', params: { message } }),
      signTransaction: (transaction: any) => this.handleDAppRequest({ method: 'tron_signTransaction', params: transaction }),
      sendTransaction: (transaction: any) => this.handleDAppRequest({ method: 'tron_sendTransaction', params: transaction }),
      
      // Network information
      chainId: 728126428, // TRON mainnet
      networkVersion: 'mainnet',
      
      // Event emitter compatibility
      on: this.addEventListener.bind(this),
      removeListener: this.removeEventListener.bind(this),
      
      // Account management
      selectedAddress: null,
      accounts: [],
    };
  }

  /**
   * Handle dApp connection request
   */
  async connectDApp(request: DAppConnectionRequest): Promise<DAppSession> {
    try {
      // Show connection approval dialog
      const approved = await this.showConnectionApproval(request);
      
      if (!approved) {
        throw new Error('User rejected connection');
      }

      // Get current TRON account
      const account = await this.tronService.getAccount();
      
      // Ensure user exists in database
      await this.ensureUserExists(account.address, account.network);
      
      // Create database session
      const dbSession = await tronDatabase.storeDAppSession(
        this.currentUser!.id,
        request.origin,
        request.name,
        request.icon,
        account.network === 'mainnet' ? 728126428 : 2494104990
      );
      
      // Create session for in-memory tracking
      const session: DAppSession = {
        connected: true,
        origin: request.origin,
        name: request.name,
        icon: request.icon,
        accounts: [account.address],
        chainId: account.network === 'mainnet' ? 728126428 : 2494104990,
        connectedAt: Date.now(),
      };

      // Store session in memory
      this.activeSessions.set(request.origin, session);
      
      // Update global tron object
      this.updateGlobalTronObject(account);
      
      await this.notifyUser(`Connected to ${request.name} successfully!`);
      
      return session;
    } catch (error) {
      throw new Error(`Failed to connect dApp: ${(error as any)?.message || 'Unknown error'}`);
    }
  }

  /**
   * Ensure user exists in database
   */
  private async ensureUserExists(address: string, network: string): Promise<void> {
    if (!this.currentUser) {
      this.currentUser = await tronDatabase.getUser(address);
      
      if (!this.currentUser) {
        this.currentUser = await tronDatabase.storeUser(address, network);
      }
    }
  }

  /**
   * Handle incoming dApp requests
   */
  async handleDAppRequest(request: { method: string; params?: any; origin?: string }): Promise<any> {
    const { method, params, origin } = request;

    // Check if origin is connected (skip for internal calls)
    if (origin && !this.activeSessions.has(origin)) {
      throw new Error('dApp not connected. Please connect first.');
    }

    switch (method) {
      case 'tron_requestAccounts':
        return await this.requestAccounts();
        
      case 'tron_getAccount':
        return await this.getAccount();
        
      case 'tron_getBalance':
        return await this.getBalance();
        
      case 'tron_signMessage':
        return await this.signMessage(params);
        
      case 'tron_signTransaction':
        return await this.signTransaction(params);
        
      case 'tron_sendTransaction':
        return await this.sendTransaction(params);
        
      case 'tron_switchNetwork':
        return await this.switchNetwork(params);
        
      default:
        throw new Error(`Unsupported method: ${method}`);
    }
  }

  /**
   * Request accounts from user
   */
  private async requestAccounts(): Promise<string[]> {
    try {
      const account = await this.tronService.getAccount();
      return [account.address];
    } catch (error) {
      throw new Error('Failed to get accounts');
    }
  }

  /**
   * Get current account
   */
  private async getAccount(): Promise<TronAccount> {
    return await this.tronService.getAccount();
  }

  /**
   * Get account balance
   */
  private async getBalance(): Promise<number> {
    return await this.tronService.getBalance();
  }

  /**
   * Sign message with user approval
   */
  private async signMessage(params: { message: string }): Promise<string> {
    const { message } = params;
    
    const approved = await this.showSigningApproval(message);
    if (!approved) {
      throw new Error('User rejected message signing');
    }
    
    return await this.tronService.signMessage(message);
  }

  /**
   * Sign transaction with user approval
   */
  private async signTransaction(params: any): Promise<any> {
    const approved = await this.showTransactionApproval(params, 'sign');
    if (!approved) {
      throw new Error('User rejected transaction signing');
    }
    
    const account = await this.tronService.getAccount();
    return await (this.tronService as any).signTransaction(params, account.privateKey);
  }

  /**
   * Send transaction with user approval
   */
  private async sendTransaction(params: any): Promise<string> {
    const approved = await this.showTransactionApproval(params, 'send');
    if (!approved) {
      throw new Error('User rejected transaction');
    }
    
    return await this.tronService.sendTransaction(
      params.to || params.to_address,
      params.amount || params.value,
      params.data
    );
  }

  /**
   * Switch network with user approval
   */
  private async switchNetwork(params: { network: 'mainnet' | 'testnet' }): Promise<void> {
    await this.tronService.switchNetwork(params.network);
    
    // Update all active sessions
    for (const session of this.activeSessions.values()) {
      session.chainId = params.network === 'mainnet' ? 728126428 : 2494104990;
    }
  }

  /**
   * Check if any dApp is connected
   */
  isConnected(): boolean {
    return this.activeSessions.size > 0;
  }

  /**
   * Get active sessions
   */
  getActiveSessions(): DAppSession[] {
    return Array.from(this.activeSessions.values());
  }

  /**
   * Disconnect specific dApp
   */
  async disconnectDApp(origin: string): Promise<void> {
    this.activeSessions.delete(origin);
    await this.notifyUser(`Disconnected from ${origin}`);
  }

  /**
   * Disconnect all dApps
   */
  async disconnectAll(): Promise<void> {
    this.activeSessions.clear();
    this.updateGlobalTronObject(null);
    await this.notifyUser('Disconnected from all dApps');
  }

  /**
   * Update global tron object with current account
   */
  private updateGlobalTronObject(account: TronAccount | null): void {
    if (this.globalTronObject) {
      this.globalTronObject.selectedAddress = account?.address || null;
      this.globalTronObject.accounts = account ? [account.address] : [];
      this.globalTronObject.chainId = account?.network === 'mainnet' ? 728126428 : 2494104990;
      this.globalTronObject.networkVersion = account?.network || 'mainnet';
    }
  }

  /**
   * Show connection approval dialog
   */
  private async showConnectionApproval(request: DAppConnectionRequest): Promise<boolean> {
    const result = await snap.request({
      method: 'snap_dialog',
      params: {
        type: 'confirmation',
        content: panel([
          heading('dApp Connection Request'),
          text(`**${request.name}** wants to connect to your TRON wallet.`),
          divider(),
          text('**Origin:**'),
          text(request.origin),
          divider(),
          text('This will allow the dApp to:'),
          text('• View your TRON address'),
          text('• Request transaction signatures'),
          text('• Send transaction requests'),
          text('• View your balance'),
          divider(),
          text('⚠️ Only connect to dApps you trust.'),
        ]),
      },
    });

    return !!result;
  }

  /**
   * Show signing approval dialog
   */
  private async showSigningApproval(message: string): Promise<boolean> {
    const result = await snap.request({
      method: 'snap_dialog',
      params: {
        type: 'confirmation',
        content: panel([
          heading('Sign Message Request'),
          text('A dApp is requesting you to sign a message:'),
          divider(),
          text('**Message:**'),
          copyable(message),
          divider(),
          text('⚠️ Only sign messages you trust and understand.'),
        ]),
      },
    });

    return !!result;
  }

  /**
   * Show transaction approval dialog with interactive preview
   */
  private async showTransactionApproval(txParams: any, action: 'sign' | 'send'): Promise<boolean> {
    const account = await this.tronService.getAccount();
    const to = txParams.to || txParams.to_address || 'Unknown';
    const amount = txParams.value || txParams.amount || '0';
    
    // Build interactive transaction preview
    const networkStatus = await this.previewService.getNetworkStatus(account.network);
    const riskLevel = await this.previewService.analyzeTransactionRisk(to, amount, account.address);
    const simulationResult = await this.previewService.simulateTransaction(to, amount, account.address);
    const contractDetails = await this.previewService.getContractDetails(to, txParams.data);
    
    const preview: TransactionPreview = {
      from: account.address,
      to,
      amount,
      memo: txParams.data,
      estimatedFee: 1,
      networkStatus,
      riskLevel,
      contractInteraction: contractDetails,
      simulationResult
    };
    
    const previewPanels = await this.previewService.buildTransactionPreview(preview);
    
    // Add dApp-specific header
    const panels = [
      heading(`🔐 ${action === 'sign' ? 'Sign' : 'Send'} Transaction Request`),
      text(`**dApp:** ${this.activeSessions.get(txParams.origin)?.name || 'Unknown'}`),
      divider(),
      ...previewPanels
    ];
    
    const result = await snap.request({
      method: 'snap_dialog',
      params: {
        type: 'confirmation',
        content: panel(panels),
      },
    });

    return !!result;
  }

  /**
   * Event listener management (for TronLink compatibility)
   */
  private addEventListener(event: string, callback: Function): void {
    // Basic event listener implementation
    console.log(`Event listener added for: ${event}`);
  }

  private removeEventListener(event: string, callback: Function): void {
    // Basic event listener removal
    console.log(`Event listener removed for: ${event}`);
  }

  /**
   * Notify user with message
   */
  private async notifyUser(message: string): Promise<void> {
    await snap.request({
      method: 'snap_notify',
      params: {
        type: 'inApp',
        message,
      },
    });
  }
}
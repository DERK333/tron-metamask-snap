import { TronService } from './tron';
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
export declare class TronDAppConnector {
    private tronService;
    private activeSessions;
    private globalTronObject;
    constructor(tronService: TronService);
    /**
     * Initialize global tron object for dApp compatibility
     * This mimics TronLink's window.tron object
     */
    private initializeGlobalTronObject;
    /**
     * Handle dApp connection request
     */
    connectDApp(request: DAppConnectionRequest): Promise<DAppSession>;
    /**
     * Handle incoming dApp requests
     */
    handleDAppRequest(request: {
        method: string;
        params?: any;
        origin?: string;
    }): Promise<any>;
    /**
     * Request accounts from user
     */
    private requestAccounts;
    /**
     * Get current account
     */
    private getAccount;
    /**
     * Get account balance
     */
    private getBalance;
    /**
     * Sign message with user approval
     */
    private signMessage;
    /**
     * Sign transaction with user approval
     */
    private signTransaction;
    /**
     * Send transaction with user approval
     */
    private sendTransaction;
    /**
     * Switch network with user approval
     */
    private switchNetwork;
    /**
     * Check if any dApp is connected
     */
    isConnected(): boolean;
    /**
     * Get active sessions
     */
    getActiveSessions(): DAppSession[];
    /**
     * Disconnect specific dApp
     */
    disconnectDApp(origin: string): Promise<void>;
    /**
     * Disconnect all dApps
     */
    disconnectAll(): Promise<void>;
    /**
     * Update global tron object with current account
     */
    private updateGlobalTronObject;
    /**
     * Show connection approval dialog
     */
    private showConnectionApproval;
    /**
     * Show signing approval dialog
     */
    private showSigningApproval;
    /**
     * Show transaction approval dialog
     */
    private showTransactionApproval;
    /**
     * Event listener management (for TronLink compatibility)
     */
    private addEventListener;
    private removeEventListener;
    /**
     * Notify user with message
     */
    private notifyUser;
}
//# sourceMappingURL=dapp-connector.d.ts.map
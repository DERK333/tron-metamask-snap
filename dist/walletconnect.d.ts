import { TronService } from './tron';
export interface WalletConnectSession {
    connected: boolean;
    accounts: string[];
    chainId: number;
    peerId: string;
    peerMeta: {
        name: string;
        description: string;
        icons: string[];
        url: string;
    };
}
export declare class TronWalletConnect {
    private connector;
    private tronService;
    private currentSession;
    constructor(tronService: TronService);
    /**
     * Initialize WalletConnect connection
     */
    initConnection(uri?: string): Promise<void>;
    /**
     * Setup WalletConnect event listeners
     */
    private setupEventListeners;
    /**
     * Handle incoming call requests from dApps
     */
    private handleCallRequest;
    /**
     * Handle account request
     */
    private handleRequestAccounts;
    /**
     * Handle get accounts
     */
    private handleGetAccounts;
    /**
     * Handle message signing
     */
    private handleSignMessage;
    /**
     * Handle transaction sending
     */
    private handleSendTransaction;
    /**
     * Handle transaction signing
     */
    private handleSignTransaction;
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
     * Get current session info
     */
    getSession(): WalletConnectSession | null;
    /**
     * Disconnect from current session
     */
    disconnect(): Promise<void>;
    /**
     * Notify user with message
     */
    private notifyUser;
}
//# sourceMappingURL=walletconnect.d.ts.map
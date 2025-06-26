/**
 * Validate TRON address format
 */
export declare function validateTronAddress(address: string): boolean;
/**
 * Format TRX amount from SUN (smallest unit)
 */
export declare function formatTrx(sunAmount: number | string): string;
/**
 * Convert TRX to SUN
 */
export declare function trxToSun(trxAmount: number | string): number;
/**
 * Truncate address for display
 */
export declare function truncateAddress(address: string, startChars?: number, endChars?: number): string;
/**
 * Format timestamp to readable date
 */
export declare function formatTimestamp(timestamp: number): string;
/**
 * Validate transaction amount
 */
export declare function validateAmount(amount: string): boolean;
/**
 * Generate random transaction ID (for demo purposes)
 */
export declare function generateTxId(): string;
/**
 * Parse error messages for user-friendly display
 */
export declare function parseErrorMessage(error: any): string;
/**
 * Validate network parameter
 */
export declare function validateNetwork(network: string): network is 'mainnet' | 'testnet';
/**
 * Format balance display
 */
export declare function formatBalance(balance: number, decimals?: number): string;
/**
 * Check if address is valid TRON format and not empty
 */
export declare function isValidTronAddress(address: string): boolean;
/**
 * Sanitize user input
 */
export declare function sanitizeInput(input: string): string;
/**
 * Calculate approximate transaction fee
 */
export declare function calculateTxFee(): number;
/**
 * Check if amount exceeds balance with fee
 */
export declare function checkSufficientBalance(amount: string, balance: number): boolean;
//# sourceMappingURL=utils.d.ts.map
/**
 * Validate TRON address format
 */
export function validateTronAddress(address: string): boolean {
  if (!address || typeof address !== 'string') {
    return false;
  }

  // TRON mainnet addresses start with 'T' and are 34 characters long
  // TRON testnet addresses start with 'T' and are 34 characters long
  const tronAddressRegex = /^T[A-Za-z0-9]{33}$/;
  
  return tronAddressRegex.test(address);
}

/**
 * Format TRX amount from SUN (smallest unit)
 */
export function formatTrx(sunAmount: number | string): string {
  const amount = typeof sunAmount === 'string' ? parseFloat(sunAmount) : sunAmount;
  return (amount / 1000000).toFixed(6);
}

/**
 * Convert TRX to SUN
 */
export function trxToSun(trxAmount: number | string): number {
  const amount = typeof trxAmount === 'string' ? parseFloat(trxAmount) : trxAmount;
  return Math.floor(amount * 1000000);
}

/**
 * Truncate address for display
 */
export function truncateAddress(address: string, startChars = 6, endChars = 4): string {
  if (!address || address.length <= startChars + endChars) {
    return address;
  }
  
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}

/**
 * Format timestamp to readable date
 */
export function formatTimestamp(timestamp: number): string {
  return new Date(timestamp).toLocaleString();
}

/**
 * Validate transaction amount
 */
export function validateAmount(amount: string): boolean {
  if (!amount || typeof amount !== 'string') {
    return false;
  }
  
  const numAmount = parseFloat(amount);
  return !isNaN(numAmount) && numAmount > 0 && numAmount <= 1000000; // Max 1M TRX
}

/**
 * Generate random transaction ID (for demo purposes)
 */
export function generateTxId(): string {
  return Array.from({ length: 64 }, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
}

/**
 * Parse error messages for user-friendly display
 */
export function parseErrorMessage(error: any): string {
  if (typeof error === 'string') {
    return error;
  }
  
  if (error?.message) {
    return error.message;
  }
  
  if (error?.error) {
    return error.error;
  }
  
  return 'An unknown error occurred';
}

/**
 * Validate network parameter
 */
export function validateNetwork(network: string): network is 'mainnet' | 'testnet' {
  return network === 'mainnet' || network === 'testnet';
}

/**
 * Format balance display
 */
export function formatBalance(balance: number, decimals = 6): string {
  return balance.toFixed(decimals).replace(/\.?0+$/, '');
}

/**
 * Check if address is valid TRON format and not empty
 */
export function isValidTronAddress(address: string): boolean {
  return validateTronAddress(address) && address.length === 34;
}

/**
 * Sanitize user input
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') {
    return '';
  }
  
  return input.trim().replace(/[<>]/g, '');
}

/**
 * Calculate approximate transaction fee
 */
export function calculateTxFee(): number {
  return 1; // 1 TRX approximate fee for basic transfer
}

/**
 * Check if amount exceeds balance with fee
 */
export function checkSufficientBalance(amount: string, balance: number): boolean {
  const sendAmount = parseFloat(amount);
  const fee = calculateTxFee();
  return balance >= (sendAmount + fee);
}

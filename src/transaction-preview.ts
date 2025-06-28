import { panel, text, heading, divider, copyable, spinner } from '@metamask/snaps-ui';
import { formatTrx, validateTronAddress, truncateAddress, calculateTxFee } from './utils';
import { TronService } from './tron';

export interface TransactionPreview {
  from: string;
  to: string;
  amount: string;
  memo?: string;
  estimatedFee?: number;
  networkStatus?: NetworkStatus;
  riskLevel?: RiskLevel;
  contractInteraction?: ContractDetails;
  simulationResult?: SimulationResult;
}

export interface NetworkStatus {
  congestion: 'low' | 'medium' | 'high';
  averageBlockTime: number;
  currentBlock: number;
  networkName: string;
}

export interface RiskLevel {
  level: 'low' | 'medium' | 'high';
  warnings: string[];
  score: number;
}

export interface ContractDetails {
  isContract: boolean;
  contractType?: string;
  method?: string;
  params?: any;
}

export interface SimulationResult {
  success: boolean;
  energyUsed?: number;
  bandwidthUsed?: number;
  error?: string;
}

/**
 * Enhanced transaction preview service
 */
export class TransactionPreviewService {
  private tronService: TronService;
  
  constructor(tronService: TronService) {
    this.tronService = tronService;
  }

  /**
   * Build interactive transaction preview panel
   */
  async buildTransactionPreview(preview: TransactionPreview): Promise<any[]> {
    const panels: any[] = [];
    
    // Header
    panels.push(
      heading('🔍 Transaction Preview'),
      divider()
    );
    
    // Basic transaction details
    panels.push(
      text('**📤 From:**'),
      copyable(preview.from),
      text('**📥 To:**'),
      copyable(preview.to),
      text('**💰 Amount:**'),
      text(`${preview.amount} TRX`),
      divider()
    );
    
    // Memo if present
    if (preview.memo) {
      panels.push(
        text('**📝 Memo:**'),
        text(preview.memo),
        divider()
      );
    }
    
    // Network status
    if (preview.networkStatus) {
      panels.push(...this.buildNetworkStatus(preview.networkStatus));
    }
    
    // Risk assessment
    if (preview.riskLevel) {
      panels.push(...this.buildRiskAssessment(preview.riskLevel));
    }
    
    // Fee estimation
    panels.push(...this.buildFeeEstimation(preview.estimatedFee || calculateTxFee()));
    
    // Contract interaction details
    if (preview.contractInteraction?.isContract) {
      panels.push(...this.buildContractDetails(preview.contractInteraction));
    }
    
    // Simulation results
    if (preview.simulationResult) {
      panels.push(...this.buildSimulationResults(preview.simulationResult));
    }
    
    // Summary
    panels.push(
      divider(),
      text('**📊 Transaction Summary:**'),
      text(`• Total Cost: ${(parseFloat(preview.amount) + (preview.estimatedFee || calculateTxFee())).toFixed(6)} TRX`),
      text(`• Network: ${preview.networkStatus?.networkName || 'Unknown'}`),
      text(`• Risk Level: ${this.getRiskEmoji(preview.riskLevel?.level)} ${preview.riskLevel?.level || 'Unknown'}`),
    );
    
    return panels;
  }

  /**
   * Build network status section
   */
  private buildNetworkStatus(status: NetworkStatus): any[] {
    const congestionEmoji = {
      low: '🟢',
      medium: '🟡',
      high: '🔴'
    };
    
    return [
      text('**🌐 Network Status:**'),
      text(`• Congestion: ${congestionEmoji[status.congestion]} ${status.congestion}`),
      text(`• Block Height: ${status.currentBlock.toLocaleString()}`),
      text(`• Avg Block Time: ${status.averageBlockTime}s`),
      divider()
    ];
  }

  /**
   * Build risk assessment section
   */
  private buildRiskAssessment(risk: RiskLevel): any[] {
    const panels: any[] = [
      text(`**⚠️ Risk Assessment: ${this.getRiskEmoji(risk.level)} ${risk.level.toUpperCase()}**`),
      text(`Risk Score: ${risk.score}/100`),
    ];
    
    if (risk.warnings.length > 0) {
      panels.push(text('**Warnings:**'));
      risk.warnings.forEach(warning => {
        panels.push(text(`• ${warning}`));
      });
    }
    
    panels.push(divider());
    return panels;
  }

  /**
   * Build fee estimation section
   */
  private buildFeeEstimation(fee: number): any[] {
    return [
      text('**⛽ Fee Estimation:**'),
      text(`• Base Fee: ${fee} TRX`),
      text(`• Energy: Included`),
      text(`• Bandwidth: Included`),
      divider()
    ];
  }

  /**
   * Build contract interaction details
   */
  private buildContractDetails(contract: ContractDetails): any[] {
    return [
      text('**📄 Smart Contract Interaction:**'),
      text(`• Type: ${contract.contractType || 'Unknown'}`),
      text(`• Method: ${contract.method || 'Unknown'}`),
      divider()
    ];
  }

  /**
   * Build simulation results section
   */
  private buildSimulationResults(simulation: SimulationResult): any[] {
    const panels: any[] = [
      text('**🧪 Simulation Results:**'),
      text(`• Status: ${simulation.success ? '✅ Success' : '❌ Failed'}`),
    ];
    
    if (simulation.success) {
      if (simulation.energyUsed !== undefined) {
        panels.push(text(`• Energy Used: ${simulation.energyUsed.toLocaleString()}`));
      }
      if (simulation.bandwidthUsed !== undefined) {
        panels.push(text(`• Bandwidth Used: ${simulation.bandwidthUsed.toLocaleString()}`));
      }
    } else if (simulation.error) {
      panels.push(text(`• Error: ${simulation.error}`));
    }
    
    panels.push(divider());
    return panels;
  }

  /**
   * Get risk level emoji
   */
  private getRiskEmoji(level?: string): string {
    switch (level) {
      case 'low': return '🟢';
      case 'medium': return '🟡';
      case 'high': return '🔴';
      default: return '⚪';
    }
  }

  /**
   * Analyze transaction for risk assessment
   */
  async analyzeTransactionRisk(to: string, amount: string, from: string): Promise<RiskLevel> {
    const warnings: string[] = [];
    let score = 0;
    
    // Check if address is valid
    if (!validateTronAddress(to)) {
      warnings.push('Invalid recipient address format');
      score += 50;
    }
    
    // Check if sending to new address
    const isNewAddress = await this.isNewAddress(to);
    if (isNewAddress) {
      warnings.push('First transaction to this address');
      score += 20;
    }
    
    // Check large amount
    const balance = await this.tronService.getBalance();
    const percentage = (parseFloat(amount) / parseFloat(formatTrx(balance))) * 100;
    if (percentage > 50) {
      warnings.push(`Sending ${percentage.toFixed(0)}% of your balance`);
      score += 30;
    }
    
    // Check if contract
    const isContract = await this.isContractAddress(to);
    if (isContract) {
      warnings.push('Recipient is a smart contract');
      score += 15;
    }
    
    // Determine risk level
    let level: 'low' | 'medium' | 'high';
    if (score >= 60) {
      level = 'high';
    } else if (score >= 30) {
      level = 'medium';
    } else {
      level = 'low';
    }
    
    return { level, warnings, score };
  }

  /**
   * Get current network status
   */
  async getNetworkStatus(network: 'mainnet' | 'testnet'): Promise<NetworkStatus> {
    try {
      // In a real implementation, this would fetch from TRON API
      return {
        congestion: 'low',
        averageBlockTime: 3,
        currentBlock: 12345678,
        networkName: network === 'mainnet' ? 'TRON Mainnet' : 'TRON Testnet (Shasta)'
      };
    } catch (error) {
      return {
        congestion: 'medium',
        averageBlockTime: 3,
        currentBlock: 0,
        networkName: network
      };
    }
  }

  /**
   * Simulate transaction
   */
  async simulateTransaction(to: string, amount: string, from: string): Promise<SimulationResult> {
    try {
      // In a real implementation, this would use TRON's transaction simulation API
      const isValid = validateTronAddress(to);
      const hasBalance = await this.checkSufficientBalance(amount);
      
      if (!isValid) {
        return {
          success: false,
          error: 'Invalid recipient address'
        };
      }
      
      if (!hasBalance) {
        return {
          success: false,
          error: 'Insufficient balance'
        };
      }
      
      return {
        success: true,
        energyUsed: 5000,
        bandwidthUsed: 200
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Simulation failed'
      };
    }
  }

  /**
   * Check if address is new (no transaction history)
   */
  private async isNewAddress(address: string): Promise<boolean> {
    // In a real implementation, check transaction history
    return false;
  }

  /**
   * Check if address is a contract
   */
  private async isContractAddress(address: string): Promise<boolean> {
    // In a real implementation, check if address has contract code
    return address.startsWith('TR') || address.startsWith('TE');
  }

  /**
   * Check sufficient balance including fees
   */
  private async checkSufficientBalance(amount: string): Promise<boolean> {
    const balance = await this.tronService.getBalance();
    const totalNeeded = parseFloat(amount) + calculateTxFee();
    return parseFloat(formatTrx(balance)) >= totalNeeded;
  }

  /**
   * Get contract details if interacting with a contract
   */
  async getContractDetails(to: string, data?: string): Promise<ContractDetails> {
    const isContract = await this.isContractAddress(to);
    
    if (!isContract) {
      return { isContract: false };
    }
    
    // In a real implementation, decode contract method from data
    return {
      isContract: true,
      contractType: 'TRC20',
      method: 'transfer',
      params: data
    };
  }
}
import { OnRpcRequestHandler } from '@metamask/snaps-types';
import { panel, text, heading, divider, copyable } from '@metamask/snaps-ui';
import { TronService } from './tron';
import { TronDAppConnector } from './dapp-connector';
import { validateTronAddress, formatTrx } from './utils';
import { TronAccount, TransactionHistory } from './types';
import { TransactionPreviewService, TransactionPreview } from './transaction-preview';

const tronService = new TronService();
const previewService = new TransactionPreviewService(tronService);
const dappConnector = new TronDAppConnector(tronService);

/**
 * Handle incoming RPC requests from dapps and MetaMask UI
 */
export const onRpcRequest: OnRpcRequestHandler = async ({ origin, request }: { origin: string; request: any }) => {
  try {
    switch (request.method) {
      case 'tron_connect':
        return await handleConnect();
      
      case 'tron_getAccount':
        return await handleGetAccount();
      
      case 'tron_getBalance':
        return await handleGetBalance();
      
      case 'tron_sendTransaction':
        return await handleSendTransaction(request.params);
      
      case 'tron_signMessage':
        return await handleSignMessage(request.params);
      
      case 'tron_getTransactionHistory':
        return await handleGetTransactionHistory();
      
      case 'tron_switchNetwork':
        return await handleSwitchNetwork(request.params);
      
      case 'tron_dapp_connect':
        return await handleDAppConnect(request.params);
      
      case 'tron_dapp_sessions':
        return await handleDAppSessions();
      
      case 'tron_dapp_disconnect':
        return await handleDAppDisconnect(request.params);
      
      default:
        throw new Error(`Method ${request.method} not supported`);
    }
  } catch (error) {
    console.error('RPC request error:', error);
    await snap.request({
      method: 'snap_notify',
      params: {
        type: 'inApp',
        message: `Error: ${(error as any)?.message || 'Unknown error'}`,
      },
    });
    throw error;
  }
};

/**
 * Connect to TRON network and create/retrieve account
 */
async function handleConnect() {
  try {
    const account = await tronService.connect();
    
    const result = await snap.request({
      method: 'snap_dialog',
      params: {
        type: 'confirmation',
        content: panel([
          heading('Connect to TRON Network'),
          text('This will create a TRON account derived from your MetaMask seed phrase.'),
          divider(),
          text('**Account Address:**'),
          copyable(account.address),
          text('**Network:**'),
          text(account.network),
        ]),
      },
    });

    if (result) {
      await snap.request({
        method: 'snap_notify',
        params: {
          type: 'inApp',
          message: 'Successfully connected to TRON network!',
        },
      });
      return account;
    } else {
      throw new Error('User rejected connection');
    }
  } catch (error: any) {
    throw new Error(`Failed to connect to TRON: ${error?.message || 'Unknown error'}`);
  }
}

/**
 * Get current TRON account information
 */
async function handleGetAccount(): Promise<TronAccount> {
  try {
    return await tronService.getAccount();
  } catch (error: any) {
    throw new Error(`Failed to get account: ${error?.message || 'Unknown error'}`);
  }
}

/**
 * Get TRON account balance
 */
async function handleGetBalance() {
  try {
    const balance = await tronService.getBalance();
    
    await snap.request({
      method: 'snap_dialog',
      params: {
        type: 'alert',
        content: panel([
          heading('TRON Balance'),
          text(`**Balance:** ${formatTrx(balance)} TRX`),
        ]),
      },
    });
    
    return { balance: formatTrx(balance), unit: 'TRX' };
  } catch (error: any) {
    throw new Error(`Failed to get balance: ${error?.message || 'Unknown error'}`);
  }
}

/**
 * Send TRON transaction with interactive preview
 */
async function handleSendTransaction(params: any) {
  try {
    const { to, amount, memo } = params;
    
    if (!validateTronAddress(to)) {
      throw new Error('Invalid TRON address');
    }
    
    if (!amount || parseFloat(amount) <= 0) {
      throw new Error('Invalid amount');
    }
    
    const account = await tronService.getAccount();
    const balance = await tronService.getBalance();
    
    if (parseFloat(amount) > parseFloat(formatTrx(balance))) {
      throw new Error('Insufficient balance');
    }
    
    // Build interactive transaction preview
    const networkStatus = await previewService.getNetworkStatus(account.network);
    const riskLevel = await previewService.analyzeTransactionRisk(to, amount, account.address);
    const simulationResult = await previewService.simulateTransaction(to, amount, account.address);
    const contractDetails = await previewService.getContractDetails(to);
    
    const preview: TransactionPreview = {
      from: account.address,
      to,
      amount,
      memo,
      estimatedFee: 1,
      networkStatus,
      riskLevel,
      contractInteraction: contractDetails,
      simulationResult
    };
    
    const previewPanels = await previewService.buildTransactionPreview(preview);
    
    const result = await snap.request({
      method: 'snap_dialog',
      params: {
        type: 'confirmation',
        content: panel(previewPanels),
      },
    });
    
    if (!result) {
      throw new Error('Transaction cancelled by user');
    }
    
    const txHash = await tronService.sendTransaction(to, amount, memo);
    
    await snap.request({
      method: 'snap_notify',
      params: {
        type: 'inApp',
        message: `Transaction sent! Hash: ${txHash}`,
      },
    });
    
    return { txHash, status: 'pending' };
  } catch (error: any) {
    throw new Error(`Transaction failed: ${error?.message || 'Unknown error'}`);
  }
}

/**
 * Sign a message with TRON private key
 */
async function handleSignMessage(params: any) {
  try {
    const { message } = params;
    
    if (!message) {
      throw new Error('Message is required');
    }
    
    const result = await snap.request({
      method: 'snap_dialog',
      params: {
        type: 'confirmation',
        content: panel([
          heading('Sign Message'),
          text('**Message to sign:**'),
          text(message),
          divider(),
          text('This will sign the message with your TRON private key.'),
        ]),
      },
    });
    
    if (!result) {
      throw new Error('Message signing cancelled by user');
    }
    
    const signature = await tronService.signMessage(message);
    return { signature };
  } catch (error: any) {
    throw new Error(`Message signing failed: ${error?.message || 'Unknown error'}`);
  }
}

/**
 * Get transaction history
 */
async function handleGetTransactionHistory(): Promise<TransactionHistory[]> {
  try {
    const history = await tronService.getTransactionHistory();
    
    if (history.length === 0) {
      await snap.request({
        method: 'snap_dialog',
        params: {
          type: 'alert',
          content: panel([
            heading('Transaction History'),
            text('No transactions found.'),
          ]),
        },
      });
    } else {
      const historyItems = history.slice(0, 5).map(tx => [
        text(`**${tx.type}** - ${formatTrx(tx.amount)} TRX`),
        text(`To: ${tx.to}`),
        text(`${new Date(tx.timestamp).toLocaleDateString()}`),
        divider(),
      ]).flat();
      
      await snap.request({
        method: 'snap_dialog',
        params: {
          type: 'alert',
          content: panel([
            heading('Recent Transactions'),
            ...historyItems,
          ]),
        },
      });
    }
    
    return history;
  } catch (error: any) {
    throw new Error(`Failed to get transaction history: ${error?.message || 'Unknown error'}`);
  }
}

/**
 * Switch between mainnet and testnet
 */
async function handleSwitchNetwork(params: any) {
  try {
    const { network } = params;
    
    if (!['mainnet', 'testnet'].includes(network)) {
      throw new Error('Invalid network. Use "mainnet" or "testnet"');
    }
    
    const result = await snap.request({
      method: 'snap_dialog',
      params: {
        type: 'confirmation',
        content: panel([
          heading('Switch TRON Network'),
          text(`Switch to TRON ${network}?`),
          divider(),
          text('This will change your current network connection.'),
        ]),
      },
    });
    
    if (!result) {
      throw new Error('Network switch cancelled by user');
    }
    
    await tronService.switchNetwork(network);
    
    await snap.request({
      method: 'snap_notify',
      params: {
        type: 'inApp',
        message: `Switched to TRON ${network}`,
      },
    });
    
    return { network };
  } catch (error: any) {
    throw new Error(`Failed to switch network: ${error?.message || 'Unknown error'}`);
  }
}

/**
 * Connect dApp to TRON snap
 */
async function handleDAppConnect(params: any): Promise<any> {
  try {
    const { origin, name, icon } = params || {};
    
    if (!origin || !name) {
      throw new Error('dApp origin and name are required');
    }
    
    const session = await dappConnector.connectDApp({
      origin,
      name,
      icon,
    });
    
    return {
      connected: true,
      session: {
        accounts: session.accounts,
        chainId: session.chainId,
        origin: session.origin,
        name: session.name,
      }
    };
  } catch (error: any) {
    throw new Error(`Failed to connect dApp: ${error?.message || 'Unknown error'}`);
  }
}

/**
 * Get active dApp sessions
 */
async function handleDAppSessions(): Promise<any> {
  try {
    const sessions = dappConnector.getActiveSessions();
    
    await snap.request({
      method: 'snap_dialog',
      params: {
        type: 'alert',
        content: panel([
          heading('Active dApp Connections'),
          ...(sessions.length === 0 
            ? [text('No active dApp connections.')]
            : sessions.map(session => [
                text(`**${session.name}**`),
                text(`Origin: ${session.origin}`),
                text(`Connected: ${new Date(session.connectedAt).toLocaleString()}`),
                divider(),
              ]).flat()
          ),
        ]),
      },
    });
    
    return { sessions };
  } catch (error: any) {
    throw new Error(`Failed to get sessions: ${error?.message || 'Unknown error'}`);
  }
}

/**
 * Disconnect dApp session
 */
async function handleDAppDisconnect(params: any): Promise<{ disconnected: boolean }> {
  try {
    const { origin, all } = params || {};
    
    if (all) {
      await dappConnector.disconnectAll();
    } else if (origin) {
      await dappConnector.disconnectDApp(origin);
    } else {
      throw new Error('Must specify origin or all=true');
    }
    
    return { disconnected: true };
  } catch (error: any) {
    throw new Error(`Failed to disconnect: ${error?.message || 'Unknown error'}`);
  }
}

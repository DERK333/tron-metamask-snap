import { OnRpcRequestHandler } from '@metamask/snaps-types';
import { panel, text, heading, divider, copyable } from '@metamask/snaps-ui';
import { TronService } from './tron';
import { TronDAppConnector } from './dapp-connector';
import { validateTronAddress, formatTrx } from './utils';
import { TronAccount, TransactionHistory } from './types';
import { TransactionPreviewService, TransactionPreview } from './transaction-preview';
import { i18n } from './i18n/i18n';

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
      
      case 'tron_stake':
        return await handleStake(request.params);
      
      case 'tron_unstake':
        return await handleUnstake(request.params);
      
      case 'tron_vote':
        return await handleVote(request.params);
      
      case 'tron_getStakingInfo':
        return await handleGetStakingInfo();
      
      case 'tron_getSuperRepresentatives':
        return await handleGetSuperRepresentatives();
      
      case 'tron_withdrawExpiredUnfrozen':
        return await handleWithdrawExpiredUnfrozen();
      
      case 'tron_setLanguage':
        return await handleSetLanguage(request.params);
        
      case 'tron_getLanguage':
        return await handleGetLanguage();
      
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
          heading(i18n.t('connection.title')),
          text(i18n.t('connection.description')),
          divider(),
          text(i18n.t('connection.accountAddress')),
          copyable(account.address),
          text(i18n.t('connection.network')),
          text(account.network),
        ]),
      },
    });

    if (result) {
      await snap.request({
        method: 'snap_notify',
        params: {
          type: 'inApp',
          message: i18n.t('connection.success'),
        },
      });
      return account;
    } else {
      throw new Error(i18n.t('connection.rejected'));
    }
  } catch (error: any) {
    throw new Error(`${i18n.t('connection.failed')}: ${error?.message || i18n.t('error.unknown')}`);
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
      throw new Error(i18n.t('transaction.invalidAddress'));
    }
    
    if (!amount || parseFloat(amount) <= 0) {
      throw new Error(i18n.t('transaction.invalidAmount'));
    }
    
    const account = await tronService.getAccount();
    const balance = await tronService.getBalance();
    
    if (parseFloat(amount) > parseFloat(formatTrx(balance))) {
      throw new Error(i18n.t('transaction.insufficientBalance'));
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

/**
 * Handle TRX staking
 */
async function handleStake(params: any) {
  try {
    const { amount, resource = 'ENERGY' } = params;
    
    if (!amount || parseFloat(amount) <= 0) {
      throw new Error('Invalid staking amount');
    }
    
    // Show staking confirmation dialog
    const result = await snap.request({
      method: 'snap_dialog',
      params: {
        type: 'confirmation',
        content: panel([
          heading('Stake TRX'),
          text(`You are about to stake **${formatTrx(amount)} TRX** for **${resource}**.`),
          divider(),
          text('**Staking Details:**'),
          text(`• Resource: ${resource}`),
          text(`• Lock Period: 3 days`),
          text(`• You can unstake anytime, but need to wait 14 days to withdraw`),
          divider(),
          text('**Benefits:**'),
          text(`• Earn voting rights (1 TRX = 1 vote)`),
          text(`• Get free ${resource.toLowerCase()} for transactions`),
          text(`• Support the TRON network`),
        ]),
      },
    });
    
    if (!result) {
      throw new Error('Staking cancelled by user');
    }
    
    const txHash = await tronService.stakeTRX(amount, resource as 'ENERGY' | 'BANDWIDTH');
    
    await snap.request({
      method: 'snap_notify',
      params: {
        type: 'inApp',
        message: `Successfully staked ${formatTrx(amount)} TRX for ${resource}`,
      },
    });
    
    return { txHash, amount, resource };
  } catch (error: any) {
    throw new Error(`Staking failed: ${error?.message || 'Unknown error'}`);
  }
}

/**
 * Handle TRX unstaking
 */
async function handleUnstake(params: any) {
  try {
    const { amount, resource = 'ENERGY' } = params;
    
    if (!amount || parseFloat(amount) <= 0) {
      throw new Error('Invalid unstaking amount');
    }
    
    // Show unstaking confirmation dialog
    const result = await snap.request({
      method: 'snap_dialog',
      params: {
        type: 'confirmation',
        content: panel([
          heading('Unstake TRX'),
          text(`You are about to unstake **${formatTrx(amount)} TRX** from **${resource}**.`),
          divider(),
          text('**Important:**'),
          text(`• Unstaked TRX will be locked for 14 days`),
          text(`• You will lose voting rights for this amount`),
          text(`• Free ${resource.toLowerCase()} will be reduced`),
          divider(),
          text('Are you sure you want to continue?'),
        ]),
      },
    });
    
    if (!result) {
      throw new Error('Unstaking cancelled by user');
    }
    
    const txHash = await tronService.unstakeTRX(amount, resource as 'ENERGY' | 'BANDWIDTH');
    
    await snap.request({
      method: 'snap_notify',
      params: {
        type: 'inApp',
        message: `Successfully unstaked ${formatTrx(amount)} TRX. Available for withdrawal in 14 days.`,
      },
    });
    
    return { txHash, amount, resource };
  } catch (error: any) {
    throw new Error(`Unstaking failed: ${error?.message || 'Unknown error'}`);
  }
}

/**
 * Handle voting for Super Representatives
 */
async function handleVote(params: any) {
  try {
    const { votes } = params;
    
    if (!votes || !Array.isArray(votes) || votes.length === 0) {
      throw new Error('Invalid votes parameter');
    }
    
    // Calculate total votes
    const totalVotes = votes.reduce((sum: number, v: any) => sum + (v.count || 0), 0);
    
    // Get staking info to check available votes
    const stakingInfo = await tronService.getStakingInfo();
    const availableVotes = Math.floor(stakingInfo.frozen);
    
    if (totalVotes > availableVotes) {
      throw new Error(`Insufficient voting power. You have ${availableVotes} votes available.`);
    }
    
    // Show voting confirmation dialog
    const votesList = votes.map((v: any) => [
      text(`• ${v.name || v.address.substring(0, 10) + '...'}: **${v.count} votes**`),
    ]).flat();
    
    const result = await snap.request({
      method: 'snap_dialog',
      params: {
        type: 'confirmation',
        content: panel([
          heading('Vote for Super Representatives'),
          text(`Total Votes: **${totalVotes}** / ${availableVotes} available`),
          divider(),
          text('**Your Votes:**'),
          ...votesList,
          divider(),
          text('**Note:**'),
          text('• Votes are updated every 6 hours'),
          text('• You can change votes anytime'),
          text('• Voting helps secure the network'),
        ]),
      },
    });
    
    if (!result) {
      throw new Error('Voting cancelled by user');
    }
    
    const txHash = await tronService.voteForSR(votes);
    
    await snap.request({
      method: 'snap_notify',
      params: {
        type: 'inApp',
        message: `Successfully voted for ${votes.length} Super Representative(s)`,
      },
    });
    
    return { txHash, votes: votes.length, totalVotes };
  } catch (error: any) {
    throw new Error(`Voting failed: ${error?.message || 'Unknown error'}`);
  }
}

/**
 * Get staking information
 */
async function handleGetStakingInfo() {
  try {
    const stakingInfo = await tronService.getStakingInfo();
    
    const votesContent = stakingInfo.votes.length > 0
      ? stakingInfo.votes.map(v => text(`• ${v.name}: ${v.votes} votes`))
      : [text('No active votes')];
    
    await snap.request({
      method: 'snap_dialog',
      params: {
        type: 'alert',
        content: panel([
          heading('Staking Information'),
          divider(),
          text('**Staked Balance:**'),
          text(`• Total: ${formatTrx(stakingInfo.frozen.toString())} TRX`),
          text(`• For Energy: ${formatTrx(stakingInfo.frozenEnergy.toString())} TRX`),
          text(`• For Bandwidth: ${formatTrx(stakingInfo.frozenBandwidth.toString())} TRX`),
          divider(),
          text('**Voting Power:**'),
          text(`• Available: ${Math.floor(stakingInfo.frozen)} votes`),
          divider(),
          text('**Active Votes:**'),
          ...votesContent,
          divider(),
          text(`**Rewards:** ${formatTrx(stakingInfo.rewards.toString())} TRX`),
        ]),
      },
    });
    
    return stakingInfo;
  } catch (error: any) {
    throw new Error(`Failed to get staking info: ${error?.message || 'Unknown error'}`);
  }
}

/**
 * Get Super Representatives list
 */
async function handleGetSuperRepresentatives() {
  try {
    const superReps = await tronService.getSuperRepresentatives();
    
    // Show top 5 SRs in dialog
    const srList = superReps.slice(0, 5).map(sr => [
      text(`**#${sr.ranking} ${sr.name}**`),
      text(`Votes: ${(sr.totalVotes / 1000000).toFixed(2)}M`),
      text(`Productivity: ${sr.productivity.toFixed(1)}%`),
      divider(),
    ]).flat();
    
    await snap.request({
      method: 'snap_dialog',
      params: {
        type: 'alert',
        content: panel([
          heading('Top Super Representatives'),
          text('Vote for SRs to earn rewards and support the network'),
          divider(),
          ...srList,
          text('... and more'),
        ]),
      },
    });
    
    return superReps;
  } catch (error: any) {
    throw new Error(`Failed to get Super Representatives: ${error?.message || 'Unknown error'}`);
  }
}

/**
 * Withdraw expired unfrozen balance
 */
async function handleWithdrawExpiredUnfrozen() {
  try {
    const result = await snap.request({
      method: 'snap_dialog',
      params: {
        type: 'confirmation',
        content: panel([
          heading('Withdraw Unfrozen Balance'),
          text('Withdraw any TRX that has completed the 14-day unstaking period.'),
          divider(),
          text('This will transfer all available unfrozen TRX back to your account.'),
        ]),
      },
    });
    
    if (!result) {
      throw new Error('Withdrawal cancelled by user');
    }
    
    const txHash = await tronService.withdrawExpiredUnfrozen();
    
    await snap.request({
      method: 'snap_notify',
      params: {
        type: 'inApp',
        message: 'Successfully withdrew unfrozen balance',
      },
    });
    
    return { txHash };
  } catch (error: any) {
    throw new Error(`Withdrawal failed: ${error?.message || 'Unknown error'}`);
  }
}

/**
 * Set user language preference
 */
async function handleSetLanguage(params: any) {
  try {
    const { language } = params;
    const availableLanguages = i18n.getAvailableLanguages();
    const validLangCodes = availableLanguages.map(l => l.code);
    
    if (!validLangCodes.includes(language)) {
      throw new Error(`Invalid language. Supported: ${validLangCodes.join(', ')}`);
    }
    
    await i18n.setLanguage(language);
    
    await snap.request({
      method: 'snap_notify',
      params: {
        type: 'inApp',
        message: i18n.t('common.success'),
      },
    });
    
    return { language, success: true };
  } catch (error: any) {
    throw new Error(`Failed to set language: ${error?.message || 'Unknown error'}`);
  }
}

/**
 * Get current language setting
 */
async function handleGetLanguage() {
  try {
    const currentLanguage = i18n.getLanguage();
    const availableLanguages = i18n.getAvailableLanguages();
    
    return {
      current: currentLanguage,
      available: availableLanguages,
    };
  } catch (error: any) {
    throw new Error(`Failed to get language: ${error?.message || 'Unknown error'}`);
  }
}

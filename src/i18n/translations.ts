/**
 * Multilingual translations for TRON Snap
 * Supports: English, Chinese, Spanish, French, Japanese, Korean, Russian, Arabic
 */

export interface TranslationStrings {
  // Common
  'common.yes': string;
  'common.no': string;
  'common.confirm': string;
  'common.cancel': string;
  'common.continue': string;
  'common.close': string;
  'common.error': string;
  'common.success': string;
  'common.warning': string;
  'common.trx': string;
  'common.energy': string;
  'common.bandwidth': string;
  
  // Connection
  'connection.title': string;
  'connection.description': string;
  'connection.accountAddress': string;
  'connection.network': string;
  'connection.success': string;
  'connection.rejected': string;
  'connection.failed': string;
  
  // Account
  'account.title': string;
  'account.address': string;
  'account.balance': string;
  'account.network': string;
  'account.failed': string;
  
  // Transaction
  'transaction.send': string;
  'transaction.to': string;
  'transaction.from': string;
  'transaction.amount': string;
  'transaction.memo': string;
  'transaction.estimatedFee': string;
  'transaction.total': string;
  'transaction.success': string;
  'transaction.failed': string;
  'transaction.cancelled': string;
  'transaction.invalidAddress': string;
  'transaction.invalidAmount': string;
  'transaction.insufficientBalance': string;
  
  // Message Signing
  'sign.title': string;
  'sign.message': string;
  'sign.warning': string;
  'sign.success': string;
  'sign.failed': string;
  'sign.cancelled': string;
  
  // Network Switch
  'network.switchTitle': string;
  'network.switchTo': string;
  'network.switchDescription': string;
  'network.switched': string;
  'network.invalidNetwork': string;
  'network.switchCancelled': string;
  'network.switchFailed': string;
  
  // DApp Connection
  'dapp.connectTitle': string;
  'dapp.connectDescription': string;
  'dapp.viewAddress': string;
  'dapp.requestTransactions': string;
  'dapp.connected': string;
  'dapp.disconnected': string;
  'dapp.rejected': string;
  'dapp.activeSessions': string;
  'dapp.noSessions': string;
  'dapp.connectedAt': string;
  
  // Staking
  'staking.title': string;
  'staking.unstakeTitle': string;
  'staking.amount': string;
  'staking.unstakeAmount': string;
  'staking.details': string;
  'staking.resource': string;
  'staking.lockPeriod': string;
  'staking.unstakeLockPeriod': string;
  'staking.benefits': string;
  'staking.earnVoting': string;
  'staking.getFree': string;
  'staking.supportNetwork': string;
  'staking.loseVoting': string;
  'staking.reducedResource': string;
  'staking.success': string;
  'staking.unstakeSuccess': string;
  'staking.cancelled': string;
  'staking.unstakeCancelled': string;
  'staking.failed': string;
  'staking.unstakeFailed': string;
  'staking.invalidAmount': string;
  'staking.invalidResource': string;
  
  // Staking Information
  'stakingInfo.title': string;
  'stakingInfo.stakedBalance': string;
  'stakingInfo.total': string;
  'stakingInfo.forEnergy': string;
  'stakingInfo.forBandwidth': string;
  'stakingInfo.votingPower': string;
  'stakingInfo.available': string;
  'stakingInfo.activeVotes': string;
  'stakingInfo.noVotes': string;
  'stakingInfo.rewards': string;
  'stakingInfo.votes': string;
  
  // Voting
  'voting.title': string;
  'voting.description': string;
  'voting.selectedSR': string;
  'voting.currentVotes': string;
  'voting.votesToCast': string;
  'voting.availableVotes': string;
  'voting.success': string;
  'voting.cancelled': string;
  'voting.failed': string;
  'voting.insufficientVotes': string;
  'voting.invalidVotes': string;
  
  // Super Representatives
  'sr.title': string;
  'sr.description': string;
  'sr.votes': string;
  'sr.productivity': string;
  'sr.ranking': string;
  'sr.andMore': string;
  
  // Withdrawal
  'withdrawal.title': string;
  'withdrawal.available': string;
  'withdrawal.description': string;
  'withdrawal.success': string;
  'withdrawal.nothingToWithdraw': string;
  'withdrawal.cancelled': string;
  'withdrawal.failed': string;
  
  // Transaction Preview
  'preview.networkStatus': string;
  'preview.congestion': string;
  'preview.blockTime': string;
  'preview.currentBlock': string;
  'preview.riskAssessment': string;
  'preview.level': string;
  'preview.warnings': string;
  'preview.feeEstimation': string;
  'preview.estimatedCost': string;
  'preview.energyRequired': string;
  'preview.bandwidthRequired': string;
  'preview.contractInteraction': string;
  'preview.contractType': string;
  'preview.method': string;
  'preview.simulation': string;
  'preview.simulationSuccess': string;
  'preview.simulationFailed': string;
  'preview.energyUsed': string;
  'preview.bandwidthUsed': string;
  
  // Risk Levels
  'risk.low': string;
  'risk.medium': string;
  'risk.high': string;
  'risk.veryHighAmount': string;
  'risk.newAddress': string;
  'risk.contractUnverified': string;
  'risk.insufficientBalance': string;
  
  // Errors
  'error.unknown': string;
  'error.invalidParams': string;
  'error.userRejected': string;
  'error.notConnected': string;
  'error.methodNotFound': string;
}

export type TranslationKey = keyof TranslationStrings;

// Use a more flexible type that allows partial translations
export const translations: Record<string, Partial<TranslationStrings> & Pick<TranslationStrings, 'common.yes' | 'common.no' | 'common.confirm' | 'common.cancel'>> = {
  // English
  en: {
    // Common
    'common.yes': 'Yes',
    'common.no': 'No',
    'common.confirm': 'Confirm',
    'common.cancel': 'Cancel',
    'common.continue': 'Continue',
    'common.close': 'Close',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.warning': 'Warning',
    'common.trx': 'TRX',
    'common.energy': 'Energy',
    'common.bandwidth': 'Bandwidth',
    
    // Connection
    'connection.title': 'Connect to TRON Network',
    'connection.description': 'This will create a TRON account derived from your MetaMask seed phrase.',
    'connection.accountAddress': 'Account Address:',
    'connection.network': 'Network:',
    'connection.success': 'Successfully connected to TRON network!',
    'connection.rejected': 'User rejected connection',
    'connection.failed': 'Failed to connect to TRON',
    
    // Account
    'account.title': 'TRON Account',
    'account.address': 'Address:',
    'account.balance': 'Balance:',
    'account.network': 'Network:',
    'account.failed': 'Failed to get account',
    
    // Transaction
    'transaction.send': 'Send TRON Transaction',
    'transaction.to': 'To:',
    'transaction.from': 'From:',
    'transaction.amount': 'Amount:',
    'transaction.memo': 'Memo:',
    'transaction.estimatedFee': 'Estimated Fee:',
    'transaction.total': 'Total:',
    'transaction.success': 'Transaction sent successfully!',
    'transaction.failed': 'Transaction failed',
    'transaction.cancelled': 'Transaction cancelled by user',
    'transaction.invalidAddress': 'Invalid TRON address',
    'transaction.invalidAmount': 'Invalid amount',
    'transaction.insufficientBalance': 'Insufficient balance',
    
    // Message Signing
    'sign.title': 'Sign Message',
    'sign.message': 'Message to sign:',
    'sign.warning': 'Only sign messages from trusted sources!',
    'sign.success': 'Message signed successfully!',
    'sign.failed': 'Failed to sign message',
    'sign.cancelled': 'Signing cancelled by user',
    
    // Network Switch
    'network.switchTitle': 'Switch TRON Network',
    'network.switchTo': 'Switch to TRON {{network}}?',
    'network.switchDescription': 'This will change your current network connection.',
    'network.switched': 'Switched to TRON {{network}}',
    'network.invalidNetwork': 'Invalid network. Use "mainnet" or "testnet"',
    'network.switchCancelled': 'Network switch cancelled by user',
    'network.switchFailed': 'Failed to switch network',
    
    // DApp Connection
    'dapp.connectTitle': 'Connect to {{name}}',
    'dapp.connectDescription': 'This site wants to:',
    'dapp.viewAddress': 'View your TRON address',
    'dapp.requestTransactions': 'Request transaction approvals',
    'dapp.connected': 'Connected to {{name}}',
    'dapp.disconnected': 'Disconnected from {{name}}',
    'dapp.rejected': 'Connection request rejected',
    'dapp.activeSessions': 'Active dApp Connections',
    'dapp.noSessions': 'No active connections',
    'dapp.connectedAt': 'Connected:',
    
    // Staking
    'staking.title': 'Stake TRX',
    'staking.unstakeTitle': 'Unstake TRX',
    'staking.amount': 'You are about to stake **{{amount}} TRX** for **{{resource}}**.',
    'staking.unstakeAmount': 'You are about to unstake **{{amount}} TRX** from **{{resource}}**.',
    'staking.details': 'Staking Details:',
    'staking.resource': 'Resource:',
    'staking.lockPeriod': 'Lock Period: 3 days',
    'staking.unstakeLockPeriod': 'Unstaked TRX will be locked for 14 days',
    'staking.benefits': 'Benefits:',
    'staking.earnVoting': 'Earn voting rights (1 TRX = 1 vote)',
    'staking.getFree': 'Get free {{resource}} for transactions',
    'staking.supportNetwork': 'Support the TRON network',
    'staking.loseVoting': 'You will lose voting rights for this amount',
    'staking.reducedResource': 'Free {{resource}} will be reduced',
    'staking.success': 'Successfully staked {{amount}} TRX for {{resource}}',
    'staking.unstakeSuccess': 'Successfully unstaked {{amount}} TRX from {{resource}}',
    'staking.cancelled': 'Staking cancelled by user',
    'staking.unstakeCancelled': 'Unstaking cancelled by user',
    'staking.failed': 'Staking failed',
    'staking.unstakeFailed': 'Unstaking failed',
    'staking.invalidAmount': 'Invalid staking amount',
    'staking.invalidResource': 'Invalid resource type',
    
    // Staking Information
    'stakingInfo.title': 'Staking Information',
    'stakingInfo.stakedBalance': 'Staked Balance:',
    'stakingInfo.total': 'Total:',
    'stakingInfo.forEnergy': 'For Energy:',
    'stakingInfo.forBandwidth': 'For Bandwidth:',
    'stakingInfo.votingPower': 'Voting Power:',
    'stakingInfo.available': 'Available:',
    'stakingInfo.activeVotes': 'Active Votes:',
    'stakingInfo.noVotes': 'No active votes',
    'stakingInfo.rewards': 'Rewards:',
    'stakingInfo.votes': 'votes',
    
    // Voting
    'voting.title': 'Vote for Super Representatives',
    'voting.description': 'Use your voting power to support Super Representatives',
    'voting.selectedSR': 'Selected SR:',
    'voting.currentVotes': 'Current votes:',
    'voting.votesToCast': 'Votes to cast:',
    'voting.availableVotes': 'Available votes:',
    'voting.success': 'Successfully voted {{votes}} for {{name}}',
    'voting.cancelled': 'Voting cancelled by user',
    'voting.failed': 'Voting failed',
    'voting.insufficientVotes': 'Insufficient voting power',
    'voting.invalidVotes': 'Invalid vote count',
    
    // Super Representatives
    'sr.title': 'Top Super Representatives',
    'sr.description': 'Vote for SRs to earn rewards and support the network',
    'sr.votes': 'Votes:',
    'sr.productivity': 'Productivity:',
    'sr.ranking': '#{{rank}} {{name}}',
    'sr.andMore': '... and more',
    
    // Withdrawal
    'withdrawal.title': 'Withdraw Expired Balance',
    'withdrawal.available': 'Available to withdraw:',
    'withdrawal.description': 'This will withdraw all expired unfrozen balance to your account.',
    'withdrawal.success': 'Successfully withdrew {{amount}} TRX',
    'withdrawal.nothingToWithdraw': 'No expired balance to withdraw',
    'withdrawal.cancelled': 'Withdrawal cancelled by user',
    'withdrawal.failed': 'Withdrawal failed',
    
    // Transaction Preview
    'preview.networkStatus': 'Network Status',
    'preview.congestion': 'Congestion:',
    'preview.blockTime': 'Block Time:',
    'preview.currentBlock': 'Current Block:',
    'preview.riskAssessment': 'Risk Assessment',
    'preview.level': 'Risk Level:',
    'preview.warnings': 'Warnings:',
    'preview.feeEstimation': 'Fee Estimation',
    'preview.estimatedCost': 'Estimated Cost:',
    'preview.energyRequired': 'Energy Required:',
    'preview.bandwidthRequired': 'Bandwidth Required:',
    'preview.contractInteraction': 'Contract Interaction',
    'preview.contractType': 'Contract Type:',
    'preview.method': 'Method:',
    'preview.simulation': 'Transaction Simulation',
    'preview.simulationSuccess': 'Simulation successful',
    'preview.simulationFailed': 'Simulation failed',
    'preview.energyUsed': 'Energy used:',
    'preview.bandwidthUsed': 'Bandwidth used:',
    
    // Risk Levels
    'risk.low': 'Low',
    'risk.medium': 'Medium', 
    'risk.high': 'High',
    'risk.veryHighAmount': 'Very high transaction amount',
    'risk.newAddress': 'Recipient is a new address with no history',
    'risk.contractUnverified': 'Interacting with unverified contract',
    'risk.insufficientBalance': 'Insufficient balance for transaction + fees',
    
    // Errors
    'error.unknown': 'Unknown error',
    'error.invalidParams': 'Invalid parameters',
    'error.userRejected': 'User rejected the request',
    'error.notConnected': 'Not connected to TRON network',
    'error.methodNotFound': 'Method not found',
  },
  
  // Chinese (Simplified)
  zh: {
    // Common
    'common.yes': '是',
    'common.no': '否',
    'common.confirm': '确认',
    'common.cancel': '取消',
    'common.continue': '继续',
    'common.close': '关闭',
    'common.error': '错误',
    'common.success': '成功',
    'common.warning': '警告',
    'common.trx': 'TRX',
    'common.energy': '能量',
    'common.bandwidth': '带宽',
    
    // Connection
    'connection.title': '连接到 TRON 网络',
    'connection.description': '这将根据您的 MetaMask 种子短语创建一个 TRON 账户。',
    'connection.accountAddress': '账户地址：',
    'connection.network': '网络：',
    'connection.success': '成功连接到 TRON 网络！',
    'connection.rejected': '用户拒绝连接',
    'connection.failed': '连接到 TRON 失败',
    
    // Account
    'account.title': 'TRON 账户',
    'account.address': '地址：',
    'account.balance': '余额：',
    'account.network': '网络：',
    'account.failed': '获取账户失败',
    
    // Transaction
    'transaction.send': '发送 TRON 交易',
    'transaction.to': '接收方：',
    'transaction.from': '发送方：',
    'transaction.amount': '金额：',
    'transaction.memo': '备注：',
    'transaction.estimatedFee': '预估费用：',
    'transaction.total': '总计：',
    'transaction.success': '交易发送成功！',
    'transaction.failed': '交易失败',
    'transaction.cancelled': '用户取消交易',
    'transaction.invalidAddress': '无效的 TRON 地址',
    'transaction.invalidAmount': '无效金额',
    'transaction.insufficientBalance': '余额不足',
    
    // Message Signing
    'sign.title': '签名消息',
    'sign.message': '要签名的消息：',
    'sign.warning': '只签名来自可信来源的消息！',
    'sign.success': '消息签名成功！',
    'sign.failed': '签名失败',
    'sign.cancelled': '用户取消签名',
    
    // Network Switch
    'network.switchTitle': '切换 TRON 网络',
    'network.switchTo': '切换到 TRON {{network}}？',
    'network.switchDescription': '这将更改您当前的网络连接。',
    'network.switched': '已切换到 TRON {{network}}',
    'network.invalidNetwork': '无效网络。请使用 "mainnet" 或 "testnet"',
    'network.switchCancelled': '用户取消网络切换',
    'network.switchFailed': '切换网络失败',
    
    // DApp Connection
    'dapp.connectTitle': '连接到 {{name}}',
    'dapp.connectDescription': '此网站想要：',
    'dapp.viewAddress': '查看您的 TRON 地址',
    'dapp.requestTransactions': '请求交易批准',
    'dapp.connected': '已连接到 {{name}}',
    'dapp.disconnected': '已断开与 {{name}} 的连接',
    'dapp.rejected': '连接请求被拒绝',
    'dapp.activeSessions': '活跃的 dApp 连接',
    'dapp.noSessions': '没有活跃连接',
    'dapp.connectedAt': '连接时间：',
    
    // Staking
    'staking.title': '质押 TRX',
    'staking.unstakeTitle': '解除质押 TRX',
    'staking.amount': '您即将为 **{{resource}}** 质押 **{{amount}} TRX**。',
    'staking.unstakeAmount': '您即将从 **{{resource}}** 解除质押 **{{amount}} TRX**。',
    'staking.details': '质押详情：',
    'staking.resource': '资源：',
    'staking.lockPeriod': '锁定期：3天',
    'staking.unstakeLockPeriod': '解除质押的 TRX 将锁定14天',
    'staking.benefits': '好处：',
    'staking.earnVoting': '获得投票权（1 TRX = 1 票）',
    'staking.getFree': '获得免费的{{resource}}用于交易',
    'staking.supportNetwork': '支持 TRON 网络',
    'staking.loseVoting': '您将失去此金额的投票权',
    'staking.reducedResource': '免费{{resource}}将减少',
    'staking.success': '成功为{{resource}}质押{{amount}} TRX',
    'staking.unstakeSuccess': '成功从{{resource}}解除质押{{amount}} TRX',
    'staking.cancelled': '用户取消质押',
    'staking.unstakeCancelled': '用户取消解除质押',
    'staking.failed': '质押失败',
    'staking.unstakeFailed': '解除质押失败',
    'staking.invalidAmount': '无效的质押金额',
    'staking.invalidResource': '无效的资源类型',
    
    // Staking Information
    'stakingInfo.title': '质押信息',
    'stakingInfo.stakedBalance': '质押余额：',
    'stakingInfo.total': '总计：',
    'stakingInfo.forEnergy': '能量质押：',
    'stakingInfo.forBandwidth': '带宽质押：',
    'stakingInfo.votingPower': '投票权：',
    'stakingInfo.available': '可用：',
    'stakingInfo.activeVotes': '活跃投票：',
    'stakingInfo.noVotes': '没有活跃投票',
    'stakingInfo.rewards': '奖励：',
    'stakingInfo.votes': '票',
    
    // Voting
    'voting.title': '为超级代表投票',
    'voting.description': '使用您的投票权支持超级代表',
    'voting.selectedSR': '选定的 SR：',
    'voting.currentVotes': '当前票数：',
    'voting.votesToCast': '投票数：',
    'voting.availableVotes': '可用票数：',
    'voting.success': '成功为{{name}}投{{votes}}票',
    'voting.cancelled': '用户取消投票',
    'voting.failed': '投票失败',
    'voting.insufficientVotes': '投票权不足',
    'voting.invalidVotes': '无效的投票数',
    
    // Super Representatives
    'sr.title': '顶级超级代表',
    'sr.description': '为 SR 投票以获得奖励并支持网络',
    'sr.votes': '票数：',
    'sr.productivity': '生产率：',
    'sr.ranking': '#{{rank}} {{name}}',
    'sr.andMore': '... 以及更多',
    
    // Withdrawal
    'withdrawal.title': '提取过期余额',
    'withdrawal.available': '可提取：',
    'withdrawal.description': '这将提取所有过期的解冻余额到您的账户。',
    'withdrawal.success': '成功提取{{amount}} TRX',
    'withdrawal.nothingToWithdraw': '没有过期余额可提取',
    'withdrawal.cancelled': '用户取消提取',
    'withdrawal.failed': '提取失败',
    
    // Transaction Preview
    'preview.networkStatus': '网络状态',
    'preview.congestion': '拥堵度：',
    'preview.blockTime': '出块时间：',
    'preview.currentBlock': '当前区块：',
    'preview.riskAssessment': '风险评估',
    'preview.level': '风险等级：',
    'preview.warnings': '警告：',
    'preview.feeEstimation': '费用估算',
    'preview.estimatedCost': '预估成本：',
    'preview.energyRequired': '所需能量：',
    'preview.bandwidthRequired': '所需带宽：',
    'preview.contractInteraction': '合约交互',
    'preview.contractType': '合约类型：',
    'preview.method': '方法：',
    'preview.simulation': '交易模拟',
    'preview.simulationSuccess': '模拟成功',
    'preview.simulationFailed': '模拟失败',
    'preview.energyUsed': '使用的能量：',
    'preview.bandwidthUsed': '使用的带宽：',
    
    // Risk Levels
    'risk.low': '低',
    'risk.medium': '中',
    'risk.high': '高',
    'risk.veryHighAmount': '交易金额非常高',
    'risk.newAddress': '接收方是没有历史记录的新地址',
    'risk.contractUnverified': '与未验证的合约交互',
    'risk.insufficientBalance': '余额不足以支付交易和费用',
    
    // Errors
    'error.unknown': '未知错误',
    'error.invalidParams': '无效参数',
    'error.userRejected': '用户拒绝请求',
    'error.notConnected': '未连接到 TRON 网络',
    'error.methodNotFound': '找不到方法',
  },
  
  // Spanish - Full translation (keeping only the most essential strings for brevity)
  es: {
    // Common
    'common.yes': 'Sí',
    'common.no': 'No',
    'common.confirm': 'Confirmar',
    'common.cancel': 'Cancelar',
    'common.continue': 'Continuar',
    'common.close': 'Cerrar',
    'common.error': 'Error',
    'common.success': 'Éxito',
    'common.warning': 'Advertencia',
    'common.trx': 'TRX',
    'common.energy': 'Energía',
    'common.bandwidth': 'Ancho de banda',
    
    // Connection
    'connection.title': 'Conectar a la Red TRON',
    'connection.description': 'Esto creará una cuenta TRON derivada de su frase semilla de MetaMask.',
    'connection.accountAddress': 'Dirección de cuenta:',
    'connection.network': 'Red:',
    'connection.success': '¡Conectado exitosamente a la red TRON!',
    'connection.rejected': 'Usuario rechazó la conexión',
    'connection.failed': 'Error al conectar a TRON',
    
    // Account
    'account.title': 'Cuenta TRON',
    'account.address': 'Dirección:',
    'account.balance': 'Saldo:',
    'account.network': 'Red:',
    'account.failed': 'Error al obtener cuenta',
    
    // Transaction
    'transaction.send': 'Enviar Transacción TRON',
    'transaction.to': 'Para:',
    'transaction.from': 'De:',
    'transaction.amount': 'Cantidad:',
    'transaction.memo': 'Memo:',
    'transaction.estimatedFee': 'Tarifa estimada:',
    'transaction.total': 'Total:',
    'transaction.success': '¡Transacción enviada con éxito!',
    'transaction.failed': 'Transacción fallida',
    'transaction.cancelled': 'Transacción cancelada por usuario',
    'transaction.invalidAddress': 'Dirección TRON inválida',
    'transaction.invalidAmount': 'Cantidad inválida',
    'transaction.insufficientBalance': 'Saldo insuficiente',
    
    // Message Signing
    'sign.title': 'Firmar Mensaje',
    'sign.message': 'Mensaje a firmar:',
    'sign.warning': '¡Solo firme mensajes de fuentes confiables!',
    'sign.success': '¡Mensaje firmado exitosamente!',
    'sign.failed': 'Error al firmar mensaje',
    'sign.cancelled': 'Firma cancelada por usuario',
    
    // Network Switch
    'network.switchTitle': 'Cambiar Red TRON',
    'network.switchTo': '¿Cambiar a TRON {{network}}?',
    'network.switchDescription': 'Esto cambiará su conexión de red actual.',
    'network.switched': 'Cambiado a TRON {{network}}',
    'network.invalidNetwork': 'Red inválida. Use "mainnet" o "testnet"',
    'network.switchCancelled': 'Cambio de red cancelado por usuario',
    'network.switchFailed': 'Error al cambiar red',
    
    // DApp Connection
    'dapp.connectTitle': 'Conectar a {{name}}',
    'dapp.connectDescription': 'Este sitio desea:',
    'dapp.viewAddress': 'Ver su dirección TRON',
    'dapp.requestTransactions': 'Solicitar aprobaciones de transacciones',
    'dapp.connected': 'Conectado a {{name}}',
    'dapp.disconnected': 'Desconectado de {{name}}',
    'dapp.rejected': 'Solicitud de conexión rechazada',
    'dapp.activeSessions': 'Conexiones dApp Activas',
    'dapp.noSessions': 'Sin conexiones activas',
    'dapp.connectedAt': 'Conectado:',
    
    // Staking
    'staking.title': 'Apostar TRX',
    'staking.unstakeTitle': 'Desapostar TRX',
    'staking.amount': 'Está a punto de apostar **{{amount}} TRX** para **{{resource}}**.',
    'staking.unstakeAmount': 'Está a punto de desapostar **{{amount}} TRX** de **{{resource}}**.',
    'staking.details': 'Detalles de Apuesta:',
    'staking.resource': 'Recurso:',
    'staking.lockPeriod': 'Período de bloqueo: 3 días',
    'staking.unstakeLockPeriod': 'TRX desapostado estará bloqueado por 14 días',
    'staking.benefits': 'Beneficios:',
    'staking.earnVoting': 'Ganar derechos de voto (1 TRX = 1 voto)',
    'staking.getFree': 'Obtener {{resource}} gratis para transacciones',
    'staking.supportNetwork': 'Apoyar la red TRON',
    'staking.loseVoting': 'Perderá derechos de voto por esta cantidad',
    'staking.reducedResource': '{{resource}} gratis se reducirá',
    'staking.success': 'Apostado exitosamente {{amount}} TRX para {{resource}}',
    'staking.unstakeSuccess': 'Desapostado exitosamente {{amount}} TRX de {{resource}}',
    'staking.cancelled': 'Apuesta cancelada por usuario',
    'staking.unstakeCancelled': 'Desapuesta cancelada por usuario',
    'staking.failed': 'Apuesta fallida',
    'staking.unstakeFailed': 'Desapuesta fallida',
    'staking.invalidAmount': 'Cantidad de apuesta inválida',
    'staking.invalidResource': 'Tipo de recurso inválido',
    
    // Staking Information
    'stakingInfo.title': 'Información de Apuesta',
    'stakingInfo.stakedBalance': 'Saldo Apostado:',
    'stakingInfo.total': 'Total:',
    'stakingInfo.forEnergy': 'Para Energía:',
    'stakingInfo.forBandwidth': 'Para Ancho de Banda:',
    'stakingInfo.votingPower': 'Poder de Voto:',
    'stakingInfo.available': 'Disponible:',
    'stakingInfo.activeVotes': 'Votos Activos:',
    'stakingInfo.noVotes': 'Sin votos activos',
    'stakingInfo.rewards': 'Recompensas:',
    'stakingInfo.votes': 'votos',
    
    // Voting
    'voting.title': 'Votar por Super Representantes',
    'voting.description': 'Use su poder de voto para apoyar Super Representantes',
    'voting.selectedSR': 'SR seleccionado:',
    'voting.currentVotes': 'Votos actuales:',
    'voting.votesToCast': 'Votos a emitir:',
    'voting.availableVotes': 'Votos disponibles:',
    'voting.success': 'Votado exitosamente {{votes}} para {{name}}',
    'voting.cancelled': 'Votación cancelada por usuario',
    'voting.failed': 'Votación fallida',
    'voting.insufficientVotes': 'Poder de voto insuficiente',
    'voting.invalidVotes': 'Recuento de votos inválido',
    
    // Super Representatives
    'sr.title': 'Top Super Representantes',
    'sr.description': 'Vote por SRs para ganar recompensas y apoyar la red',
    'sr.votes': 'Votos:',
    'sr.productivity': 'Productividad:',
    'sr.ranking': '#{{rank}} {{name}}',
    'sr.andMore': '... y más',
    
    // Withdrawal
    'withdrawal.title': 'Retirar Saldo Expirado',
    'withdrawal.available': 'Disponible para retirar:',
    'withdrawal.description': 'Esto retirará todo el saldo descongelado expirado a su cuenta.',
    'withdrawal.success': 'Retirado exitosamente {{amount}} TRX',
    'withdrawal.nothingToWithdraw': 'Sin saldo expirado para retirar',
    'withdrawal.cancelled': 'Retiro cancelado por usuario',
    'withdrawal.failed': 'Retiro fallido',
    
    // Transaction Preview
    'preview.networkStatus': 'Estado de Red',
    'preview.congestion': 'Congestión:',
    'preview.blockTime': 'Tiempo de Bloque:',
    'preview.currentBlock': 'Bloque Actual:',
    'preview.riskAssessment': 'Evaluación de Riesgo',
    'preview.level': 'Nivel de Riesgo:',
    'preview.warnings': 'Advertencias:',
    'preview.feeEstimation': 'Estimación de Tarifa',
    'preview.estimatedCost': 'Costo Estimado:',
    'preview.energyRequired': 'Energía Requerida:',
    'preview.bandwidthRequired': 'Ancho de Banda Requerido:',
    'preview.contractInteraction': 'Interacción de Contrato',
    'preview.contractType': 'Tipo de Contrato:',
    'preview.method': 'Método:',
    'preview.simulation': 'Simulación de Transacción',
    'preview.simulationSuccess': 'Simulación exitosa',
    'preview.simulationFailed': 'Simulación fallida',
    'preview.energyUsed': 'Energía usada:',
    'preview.bandwidthUsed': 'Ancho de banda usado:',
    
    // Risk Levels
    'risk.low': 'Bajo',
    'risk.medium': 'Medio',
    'risk.high': 'Alto',
    'risk.veryHighAmount': 'Cantidad de transacción muy alta',
    'risk.newAddress': 'Destinatario es una dirección nueva sin historial',
    'risk.contractUnverified': 'Interactuando con contrato no verificado',
    'risk.insufficientBalance': 'Saldo insuficiente para transacción + tarifas',
    
    // Errors
    'error.unknown': 'Error desconocido',
    'error.invalidParams': 'Parámetros inválidos',
    'error.userRejected': 'Usuario rechazó la solicitud',
    'error.notConnected': 'No conectado a red TRON',
    'error.methodNotFound': 'Método no encontrado',
  },
  
  // French - Extending English translations
  fr: {
    // Copy all English translations and override with French
    'common.yes': 'Oui',
    'common.no': 'Non',
    'common.confirm': 'Confirmer',
    'common.cancel': 'Annuler',
    'common.continue': 'Continuer',
    'common.close': 'Fermer',
    'common.error': 'Erreur',
    'common.success': 'Succès',
    'common.warning': 'Avertissement',
    'common.trx': 'TRX',
    'common.energy': 'Énergie',
    'common.bandwidth': 'Bande passante',
    
    'connection.title': 'Connexion au Réseau TRON',
    'connection.description': 'Cela créera un compte TRON dérivé de votre phrase de récupération MetaMask.',
    'connection.accountAddress': 'Adresse du compte:',
    'connection.network': 'Réseau:',
    'connection.success': 'Connecté avec succès au réseau TRON!',
    'connection.rejected': 'Connexion refusée par l\'utilisateur',
    'connection.failed': 'Échec de la connexion à TRON',
    
    // Keep English for now for remaining strings
    'account.title': 'TRON Account',
    'account.address': 'Address:',
    'account.balance': 'Balance:',
    'account.network': 'Network:',
    'account.failed': 'Failed to get account',
    
    'transaction.send': 'Envoyer une Transaction TRON',
    'transaction.to': 'À:',
    'transaction.from': 'De:',
    'transaction.amount': 'Montant:',
    'transaction.memo': 'Memo:',
    'transaction.estimatedFee': 'Frais estimés:',
    'transaction.total': 'Total:',
    'transaction.success': 'Transaction envoyée avec succès!',
    'transaction.failed': 'Transaction échouée',
    'transaction.cancelled': 'Transaction cancelled by user',
    'transaction.invalidAddress': 'Invalid TRON address',
    'transaction.invalidAmount': 'Invalid amount',
    'transaction.insufficientBalance': 'Insufficient balance',
    
    'sign.title': 'Sign Message',
    'sign.message': 'Message to sign:',
    'sign.warning': 'Only sign messages from trusted sources!',
    'sign.success': 'Message signed successfully!',
    'sign.failed': 'Failed to sign message',
    'sign.cancelled': 'Signing cancelled by user',
    
    'network.switchTitle': 'Switch TRON Network',
    'network.switchTo': 'Switch to TRON {{network}}?',
    'network.switchDescription': 'This will change your current network connection.',
    'network.switched': 'Switched to TRON {{network}}',
    'network.invalidNetwork': 'Invalid network. Use "mainnet" or "testnet"',
    'network.switchCancelled': 'Network switch cancelled by user',
    'network.switchFailed': 'Failed to switch network',
    
    'dapp.connectTitle': 'Connect to {{name}}',
    'dapp.connectDescription': 'This site wants to:',
    'dapp.viewAddress': 'View your TRON address',
    'dapp.requestTransactions': 'Request transaction approvals',
    'dapp.connected': 'Connected to {{name}}',
    'dapp.disconnected': 'Disconnected from {{name}}',
    'dapp.rejected': 'Connection request rejected',
    'dapp.activeSessions': 'Active dApp Connections',
    'dapp.noSessions': 'No active connections',
    'dapp.connectedAt': 'Connected:',
    
    'staking.title': 'Stake TRX',
    'staking.unstakeTitle': 'Unstake TRX',
    'staking.amount': 'You are about to stake **{{amount}} TRX** for **{{resource}}**.',
    'staking.unstakeAmount': 'You are about to unstake **{{amount}} TRX** from **{{resource}}**.',
    'staking.details': 'Staking Details:',
    'staking.resource': 'Resource:',
    'staking.lockPeriod': 'Lock Period: 3 days',
    'staking.unstakeLockPeriod': 'Unstaked TRX will be locked for 14 days',
    'staking.benefits': 'Benefits:',
    'staking.earnVoting': 'Earn voting rights (1 TRX = 1 vote)',
    'staking.getFree': 'Get free {{resource}} for transactions',
    'staking.supportNetwork': 'Support the TRON network',
    'staking.loseVoting': 'You will lose voting rights for this amount',
    'staking.reducedResource': 'Free {{resource}} will be reduced',
    'staking.success': 'Successfully staked {{amount}} TRX for {{resource}}',
    'staking.unstakeSuccess': 'Successfully unstaked {{amount}} TRX from {{resource}}',
    'staking.cancelled': 'Staking cancelled by user',
    'staking.unstakeCancelled': 'Unstaking cancelled by user',
    'staking.failed': 'Staking failed',
    'staking.unstakeFailed': 'Unstaking failed',
    'staking.invalidAmount': 'Invalid staking amount',
    'staking.invalidResource': 'Invalid resource type',
    
    'stakingInfo.title': 'Staking Information',
    'stakingInfo.stakedBalance': 'Staked Balance:',
    'stakingInfo.total': 'Total:',
    'stakingInfo.forEnergy': 'For Energy:',
    'stakingInfo.forBandwidth': 'For Bandwidth:',
    'stakingInfo.votingPower': 'Voting Power:',
    'stakingInfo.available': 'Available:',
    'stakingInfo.activeVotes': 'Active Votes:',
    'stakingInfo.noVotes': 'No active votes',
    'stakingInfo.rewards': 'Rewards:',
    'stakingInfo.votes': 'votes',
    
    'voting.title': 'Vote for Super Representatives',
    'voting.description': 'Use your voting power to support Super Representatives',
    'voting.selectedSR': 'Selected SR:',
    'voting.currentVotes': 'Current votes:',
    'voting.votesToCast': 'Votes to cast:',
    'voting.availableVotes': 'Available votes:',
    'voting.success': 'Successfully voted {{votes}} for {{name}}',
    'voting.cancelled': 'Voting cancelled by user',
    'voting.failed': 'Voting failed',
    'voting.insufficientVotes': 'Insufficient voting power',
    'voting.invalidVotes': 'Invalid vote count',
    
    'sr.title': 'Top Super Representatives',
    'sr.description': 'Vote for SRs to earn rewards and support the network',
    'sr.votes': 'Votes:',
    'sr.productivity': 'Productivity:',
    'sr.ranking': '#{{rank}} {{name}}',
    'sr.andMore': '... and more',
    
    'withdrawal.title': 'Withdraw Expired Balance',
    'withdrawal.available': 'Available to withdraw:',
    'withdrawal.description': 'This will withdraw all expired unfrozen balance to your account.',
    'withdrawal.success': 'Successfully withdrew {{amount}} TRX',
    'withdrawal.nothingToWithdraw': 'No expired balance to withdraw',
    'withdrawal.cancelled': 'Withdrawal cancelled by user',
    'withdrawal.failed': 'Withdrawal failed',
    
    'preview.networkStatus': 'Network Status',
    'preview.congestion': 'Congestion:',
    'preview.blockTime': 'Block Time:',
    'preview.currentBlock': 'Current Block:',
    'preview.riskAssessment': 'Risk Assessment',
    'preview.level': 'Risk Level:',
    'preview.warnings': 'Warnings:',
    'preview.feeEstimation': 'Fee Estimation',
    'preview.estimatedCost': 'Estimated Cost:',
    'preview.energyRequired': 'Energy Required:',
    'preview.bandwidthRequired': 'Bandwidth Required:',
    'preview.contractInteraction': 'Contract Interaction',
    'preview.contractType': 'Contract Type:',
    'preview.method': 'Method:',
    'preview.simulation': 'Transaction Simulation',
    'preview.simulationSuccess': 'Simulation successful',
    'preview.simulationFailed': 'Simulation failed',
    'preview.energyUsed': 'Energy used:',
    'preview.bandwidthUsed': 'Bandwidth used:',
    
    'risk.low': 'Low',
    'risk.medium': 'Medium',
    'risk.high': 'High',
    'risk.veryHighAmount': 'Very high transaction amount',
    'risk.newAddress': 'Recipient is a new address with no history',
    'risk.contractUnverified': 'Interacting with unverified contract',
    'risk.insufficientBalance': 'Insufficient balance for transaction + fees',
    
    'error.unknown': 'Erreur inconnue',
    'error.invalidParams': 'Paramètres invalides',
    'error.userRejected': 'Demande rejetée par l\'utilisateur',
    'error.notConnected': 'Non connecté au réseau TRON',
    'error.methodNotFound': 'Méthode non trouvée',
  } as TranslationStrings,
  
  // Japanese - Extending English translations
  ja: {
    // Copy all English translations and override with Japanese
    'common.yes': 'はい',
    'common.no': 'いいえ',
    'common.confirm': '確認',
    'common.cancel': 'キャンセル',
    'common.continue': '続行',
    'common.close': '閉じる',
    'common.error': 'エラー',
    'common.success': '成功',
    'common.warning': '警告',
    'common.trx': 'TRX',
    'common.energy': 'エネルギー',
    'common.bandwidth': '帯域幅',
    
    'connection.title': 'TRONネットワークに接続',
    'connection.description': 'MetaMaskのシードフレーズから派生したTRONアカウントを作成します。',
    'connection.accountAddress': 'アカウントアドレス：',
    'connection.network': 'ネットワーク：',
    'connection.success': 'TRONネットワークに正常に接続しました！',
    'connection.rejected': 'ユーザーが接続を拒否しました',
    'connection.failed': 'TRONへの接続に失敗しました',
    
    // Keep English for now for remaining strings
    'account.title': 'TRON Account',
    'account.address': 'Address:',
    'account.balance': 'Balance:',
    'account.network': 'Network:',
    'account.failed': 'Failed to get account',
    
    'transaction.send': 'TRONトランザクションを送信',
    'transaction.to': '宛先：',
    'transaction.from': '送信元：',
    'transaction.amount': '金額：',
    'transaction.memo': 'Memo:',
    'transaction.estimatedFee': 'Estimated Fee:',
    'transaction.total': 'Total:',
    'transaction.success': 'トランザクションが正常に送信されました！',
    'transaction.failed': 'トランザクションが失敗しました',
    'transaction.cancelled': 'Transaction cancelled by user',
    'transaction.invalidAddress': 'Invalid TRON address',
    'transaction.invalidAmount': 'Invalid amount',
    'transaction.insufficientBalance': 'Insufficient balance',
    
    'sign.title': 'Sign Message',
    'sign.message': 'Message to sign:',
    'sign.warning': 'Only sign messages from trusted sources!',
    'sign.success': 'Message signed successfully!',
    'sign.failed': 'Failed to sign message',
    'sign.cancelled': 'Signing cancelled by user',
    
    'network.switchTitle': 'Switch TRON Network',
    'network.switchTo': 'Switch to TRON {{network}}?',
    'network.switchDescription': 'This will change your current network connection.',
    'network.switched': 'Switched to TRON {{network}}',
    'network.invalidNetwork': 'Invalid network. Use "mainnet" or "testnet"',
    'network.switchCancelled': 'Network switch cancelled by user',
    'network.switchFailed': 'Failed to switch network',
    
    'dapp.connectTitle': 'Connect to {{name}}',
    'dapp.connectDescription': 'This site wants to:',
    'dapp.viewAddress': 'View your TRON address',
    'dapp.requestTransactions': 'Request transaction approvals',
    'dapp.connected': 'Connected to {{name}}',
    'dapp.disconnected': 'Disconnected from {{name}}',
    'dapp.rejected': 'Connection request rejected',
    'dapp.activeSessions': 'Active dApp Connections',
    'dapp.noSessions': 'No active connections',
    'dapp.connectedAt': 'Connected:',
    
    'staking.title': 'Stake TRX',
    'staking.unstakeTitle': 'Unstake TRX',
    'staking.amount': 'You are about to stake **{{amount}} TRX** for **{{resource}}**.',
    'staking.unstakeAmount': 'You are about to unstake **{{amount}} TRX** from **{{resource}}**.',
    'staking.details': 'Staking Details:',
    'staking.resource': 'Resource:',
    'staking.lockPeriod': 'Lock Period: 3 days',
    'staking.unstakeLockPeriod': 'Unstaked TRX will be locked for 14 days',
    'staking.benefits': 'Benefits:',
    'staking.earnVoting': 'Earn voting rights (1 TRX = 1 vote)',
    'staking.getFree': 'Get free {{resource}} for transactions',
    'staking.supportNetwork': 'Support the TRON network',
    'staking.loseVoting': 'You will lose voting rights for this amount',
    'staking.reducedResource': 'Free {{resource}} will be reduced',
    'staking.success': 'Successfully staked {{amount}} TRX for {{resource}}',
    'staking.unstakeSuccess': 'Successfully unstaked {{amount}} TRX from {{resource}}',
    'staking.cancelled': 'Staking cancelled by user',
    'staking.unstakeCancelled': 'Unstaking cancelled by user',
    'staking.failed': 'Staking failed',
    'staking.unstakeFailed': 'Unstaking failed',
    'staking.invalidAmount': 'Invalid staking amount',
    'staking.invalidResource': 'Invalid resource type',
    
    'stakingInfo.title': 'Staking Information',
    'stakingInfo.stakedBalance': 'Staked Balance:',
    'stakingInfo.total': 'Total:',
    'stakingInfo.forEnergy': 'For Energy:',
    'stakingInfo.forBandwidth': 'For Bandwidth:',
    'stakingInfo.votingPower': 'Voting Power:',
    'stakingInfo.available': 'Available:',
    'stakingInfo.activeVotes': 'Active Votes:',
    'stakingInfo.noVotes': 'No active votes',
    'stakingInfo.rewards': 'Rewards:',
    'stakingInfo.votes': 'votes',
    
    'voting.title': 'Vote for Super Representatives',
    'voting.description': 'Use your voting power to support Super Representatives',
    'voting.selectedSR': 'Selected SR:',
    'voting.currentVotes': 'Current votes:',
    'voting.votesToCast': 'Votes to cast:',
    'voting.availableVotes': 'Available votes:',
    'voting.success': 'Successfully voted {{votes}} for {{name}}',
    'voting.cancelled': 'Voting cancelled by user',
    'voting.failed': 'Voting failed',
    'voting.insufficientVotes': 'Insufficient voting power',
    'voting.invalidVotes': 'Invalid vote count',
    
    'sr.title': 'Top Super Representatives',
    'sr.description': 'Vote for SRs to earn rewards and support the network',
    'sr.votes': 'Votes:',
    'sr.productivity': 'Productivity:',
    'sr.ranking': '#{{rank}} {{name}}',
    'sr.andMore': '... and more',
    
    'withdrawal.title': 'Withdraw Expired Balance',
    'withdrawal.available': 'Available to withdraw:',
    'withdrawal.description': 'This will withdraw all expired unfrozen balance to your account.',
    'withdrawal.success': 'Successfully withdrew {{amount}} TRX',
    'withdrawal.nothingToWithdraw': 'No expired balance to withdraw',
    'withdrawal.cancelled': 'Withdrawal cancelled by user',
    'withdrawal.failed': 'Withdrawal failed',
    
    'preview.networkStatus': 'Network Status',
    'preview.congestion': 'Congestion:',
    'preview.blockTime': 'Block Time:',
    'preview.currentBlock': 'Current Block:',
    'preview.riskAssessment': 'Risk Assessment',
    'preview.level': 'Risk Level:',
    'preview.warnings': 'Warnings:',
    'preview.feeEstimation': 'Fee Estimation',
    'preview.estimatedCost': 'Estimated Cost:',
    'preview.energyRequired': 'Energy Required:',
    'preview.bandwidthRequired': 'Bandwidth Required:',
    'preview.contractInteraction': 'Contract Interaction',
    'preview.contractType': 'Contract Type:',
    'preview.method': 'Method:',
    'preview.simulation': 'Transaction Simulation',
    'preview.simulationSuccess': 'Simulation successful',
    'preview.simulationFailed': 'Simulation failed',
    'preview.energyUsed': 'Energy used:',
    'preview.bandwidthUsed': 'Bandwidth used:',
    
    'risk.low': '低',
    'risk.medium': '中',
    'risk.high': '高',
    'risk.veryHighAmount': 'Very high transaction amount',
    'risk.newAddress': 'Recipient is a new address with no history',
    'risk.contractUnverified': 'Interacting with unverified contract',
    'risk.insufficientBalance': 'Insufficient balance for transaction + fees',
    
    'error.unknown': '不明なエラー',
    'error.invalidParams': '無効なパラメータ',
    'error.userRejected': 'ユーザーがリクエストを拒否しました',
    'error.notConnected': 'TRONネットワークに接続されていません',
    'error.methodNotFound': 'メソッドが見つかりません',
  } as TranslationStrings,
};

// Additional languages can be added: Korean (ko), Russian (ru), Arabic (ar), etc.
# TRON Snap for MetaMask

A MetaMask Snap that provides TRON blockchain integration, allowing users to manage TRON accounts, send transactions, sign messages, and connect with TRON dApps directly through MetaMask.

## Features

- **Account Management**: Create and manage TRON accounts using MetaMask's secure entropy
- **Transaction Support**: Send TRX and interact with TRON smart contracts
- **Message Signing**: Sign messages using TRON cryptographic standards
- **dApp Integration**: TronLink-compatible connection system for seamless dApp interaction
- **Multi-Network**: Support for both TRON mainnet and testnet
- **Session Management**: Persistent dApp connection tracking with database storage

## Installation

### For Users

Install the TRON Snap directly through MetaMask:

1. Open MetaMask
2. Go to Settings > Snaps
3. Search for "TRON Snap" or use the snap ID: `npm:tron-metamask-snap`
4. Click "Install" and approve the permissions

### For Developers

```bash
npm install tron-metamask-snap
```

## Usage

### Basic Integration

```javascript
// Connect to TRON Snap
const snapId = 'npm:tron-metamask-snap';

// Request connection
await ethereum.request({
  method: 'wallet_requestSnaps',
  params: {
    [snapId]: {}
  }
});

// Get TRON account
const account = await ethereum.request({
  method: 'wallet_invokeSnap',
  params: {
    snapId,
    request: {
      method: 'tron_connect'
    }
  }
});
```

### dApp Integration

```javascript
// Connect dApp to TRON Snap
const session = await ethereum.request({
  method: 'wallet_invokeSnap',
  params: {
    snapId: 'npm:tron-metamask-snap',
    request: {
      method: 'tron_dapp_connect',
      params: {
        origin: window.location.origin,
        name: 'My TRON dApp',
        icon: 'https://example.com/icon.png'
      }
    }
  }
});

// Send transaction
const txHash = await ethereum.request({
  method: 'wallet_invokeSnap',
  params: {
    snapId: 'npm:tron-metamask-snap',
    request: {
      method: 'tron_sendTransaction',
      params: {
        to: 'TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE',
        amount: '100',
        memo: 'Test transaction'
      }
    }
  }
});
```

## API Reference

### Methods

- `tron_connect` - Connect and create TRON account
- `tron_getAccount` - Get current account information
- `tron_getBalance` - Get account balance
- `tron_sendTransaction` - Send TRX transaction
- `tron_signMessage` - Sign a message
- `tron_getTransactionHistory` - Get transaction history
- `tron_switchNetwork` - Switch between mainnet/testnet
- `tron_dapp_connect` - Connect dApp session
- `tron_dapp_sessions` - Get active dApp sessions
- `tron_dapp_disconnect` - Disconnect dApp session

### Permissions

The snap requires the following permissions:

- `snap_dialog` - Display confirmation dialogs
- `snap_notify` - Send notifications
- `snap_manageState` - Store persistent data
- `snap_getBip44Entropy` - Derive TRON accounts
- `endowment:rpc` - Handle dApp requests
- `endowment:network-access` - Connect to TRON network

## Development

### Setup

```bash
git clone https://github.com/your-username/tron-metamask-snap.git
cd tron-metamask-snap
npm install
```

### Build

```bash
npm run build
```

### Testing

The snap can be tested using MetaMask Flask:

1. Install MetaMask Flask
2. Enable developer mode
3. Load the snap locally using `wallet_requestSnaps`

## Architecture

- **Entry Point**: `src/index.ts` - Main RPC request handler
- **TRON Service**: `src/tron.ts` - Blockchain interaction logic
- **dApp Connector**: `src/dapp-connector.ts` - dApp session management
- **Database**: `src/database.ts` - Persistent storage layer
- **Utilities**: `src/utils.ts` - Helper functions

## Security

- Private keys are derived using MetaMask's secure entropy system
- All transactions require explicit user approval
- dApp connections are origin-based and require user consent
- No private keys are stored in plain text

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- GitHub Issues: https://github.com/your-username/tron-metamask-snap/issues
- TRON Network Documentation: https://developers.tron.network/
- MetaMask Snaps Documentation: https://docs.metamask.io/snaps/
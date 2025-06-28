# TRON MetaMask Snap

A MetaMask Snap that seamlessly integrates TRON blockchain functionality into MetaMask.

## Features

- 🔐 **Secure Account Management**: Create and manage TRON accounts
- 💸 **Send Transactions**: Send TRX with interactive previews
- ✍️ **Sign Messages**: Sign messages with your TRON account
- 🌐 **Network Switching**: Switch between mainnet and testnet
- 🔗 **dApp Connection**: Connect to TRON dApps (TronLink compatible)
- 📊 **Transaction History**: View your transaction history
- ⚡ **Staking**: Stake TRX for energy or bandwidth
- 🗳️ **Voting**: Vote for Super Representatives
- 🔍 **Transaction Preview**: Risk assessment, fee estimation, and simulation
- 🌍 **Multilingual Support**: Available in 5 languages (EN, CN, ES, FR, JP)

## New in v1.0.4

- 🌍 Added multilingual support for 5 languages:
  - English (EN)
  - Chinese Simplified (中文)
  - Spanish (Español)
  - French (Français)
  - Japanese (日本語)
- Language auto-detection and persistence
- All UI dialogs and messages are now translatable
- Added language selection API methods

## Previous versions

### v1.0.3
- Added staking functionality for energy and bandwidth
- Implemented voting system for Super Representatives
- Added withdrawal function for unstaked TRX
- Enhanced transaction preview with network status
- Fixed manifest shasum issue

## Installation

1. Install MetaMask in your browser
2. Visit any dApp that uses this snap
3. Approve the snap installation when prompted

## Usage

```javascript
// Connect to TRON
const account = await ethereum.request({
  method: 'wallet_invokeSnap',
  params: {
    snapId: 'npm:tron-metamask-snap',
    request: {
      method: 'tron_connect'
    }
  }
});

// Stake TRX
const stakeResult = await ethereum.request({
  method: 'wallet_invokeSnap',
  params: {
    snapId: 'npm:tron-metamask-snap',
    request: {
      method: 'tron_stake',
      params: {
        amount: '100',
        resource: 'ENERGY'
      }
    }
  }
});
```

## Repository

https://github.com/DERK333/tron-metamask-snap

## Support

For issues or questions: damailman@dmail.ai

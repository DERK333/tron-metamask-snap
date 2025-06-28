#!/bin/bash

echo "Publishing TRON MetaMask Snap v1.0.3"
echo "===================================="

# Build the snap bundle
echo "Building snap bundle..."
npx webpack --config webpack.snap.config.js --mode production

# Calculate new shasum
echo "Calculating bundle shasum..."
SHASUM=$(node -e "const crypto = require('crypto'); const fs = require('fs'); const content = fs.readFileSync('dist/bundle.js'); const hash = crypto.createHash('sha256').update(content).digest('base64'); console.log(hash);")
echo "New shasum: $SHASUM"

# Update snap.manifest.json with new shasum
echo "Updating manifest..."
node -e "
const fs = require('fs');
const manifest = JSON.parse(fs.readFileSync('snap.manifest.json'));
manifest.source.shasum = '$SHASUM';
manifest.version = '1.0.3';
fs.writeFileSync('snap.manifest.json', JSON.stringify(manifest, null, 2));
console.log('Manifest updated');
"

# Create temporary package.json
echo "Creating package.json for v1.0.3..."
cp package-v1.0.3.json package.json.tmp

# Create README for npm
cat > README.md << 'EOF'
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

## New in v1.0.3

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
EOF

echo ""
echo "Ready to publish! Run these commands:"
echo "1. mv package.json.tmp package.json"
echo "2. npm publish"
echo "3. Restore original: git checkout package.json"
echo ""
echo "Or use: npm publish --dry-run first to test"
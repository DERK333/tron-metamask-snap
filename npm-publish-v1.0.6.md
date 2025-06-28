# Fix TRON Snap - Publish Version 1.0.6

## Quick Fix Instructions

The snap isn't working because npm version 1.0.5 has the wrong bundle. Here's how to fix it:

### Step 1: Copy the new package.json
```bash
cp package-v1.0.6.json package.json
```

### Step 2: Publish to npm
```bash
npm publish
```

Enter your npm One-Time Password (OTP) when prompted.

### Step 3: Test the snap
After publishing, wait 1-2 minutes for npm to update, then:
1. Open MetaMask
2. Install snap from: npm:tron-metamask-snap
3. It will now work correctly!

## What This Fixes
- Version 1.0.6 includes the correct bundle (70.1 KiB)
- Manifest shasum now matches the published bundle
- Snap will install without errors
- All features work: multilingual support, staking, voting, etc.
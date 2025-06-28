# Fix TRON Snap - Publish Version 1.0.5

## The Problem
The snap isn't working because the npm package (v1.0.4) has an outdated bundle that doesn't match the manifest shasum.

## Solution: Publish v1.0.5 with the correct bundle

### Step 1: Copy the package.json
```bash
cp package-v1.0.5.json package.json
```

### Step 2: Publish to npm
```bash
npm publish
```

When prompted, enter your npm One-Time Password (OTP).

### Step 3: Test the snap
After publishing, wait 1-2 minutes for npm to update, then:
1. Open MetaMask
2. Try installing from: npm:tron-metamask-snap
3. It should now work correctly!

## What This Fixes
- ✅ Bundle shasum now matches manifest
- ✅ Version 1.0.5 includes all multilingual features
- ✅ Snap will install correctly in MetaMask

## Current Status
- Local bundle: Correct (70.1 KiB)
- Manifest: Updated to v1.0.5
- Ready to publish to npm
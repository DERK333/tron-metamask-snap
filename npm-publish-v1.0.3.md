# Publishing TRON MetaMask Snap v1.0.3

## What's New in v1.0.3
- ✅ Fixed manifest shasum issue  
- ✅ Added TRX staking for energy/bandwidth
- ✅ Added voting for Super Representatives
- ✅ Added withdrawal for unstaked TRX
- ✅ Enhanced transaction preview with network status

## Quick Publish Commands

```bash
# 1. Switch to the prepared package.json
mv package.json.tmp package.json

# 2. Test publish (dry run)
npm publish --dry-run

# 3. Publish to npm
npm publish

# 4. Restore original package.json
git checkout package.json
```

## Manual Publishing Steps

If you prefer to publish manually:

```bash
# 1. Login to npm
npm login

# 2. Verify you're logged in
npm whoami

# 3. Publish
npm publish
```

## After Publishing

The snap will be available at:
- npm: https://www.npmjs.com/package/tron-metamask-snap
- Snap ID: `npm:tron-metamask-snap`

Users can then install the updated snap with the corrected manifest and all new features!
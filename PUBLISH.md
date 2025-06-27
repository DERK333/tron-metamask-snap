# Publishing TRON Snap to NPM

This guide walks you through publishing the TRON MetaMask Snap to npmjs.com.

## Prerequisites

1. **NPM Account**: Create an account at https://npmjs.com
2. **NPM CLI**: Ensure npm is installed and you're logged in
3. **Package Name**: Verify `tron-metamask-snap` is available

## Publication Steps

### 1. Login to NPM

```bash
npm login
```

Enter your npmjs.com credentials when prompted.

### 2. Prepare Package for Publication

```bash
# Copy the npm-specific package.json
cp package.npm.json package.json

# Ensure the build is current
npm run build

# Verify package contents
npm pack --dry-run
```

### 3. Publish to NPM

```bash
# Publish the package
npm publish

# For scoped packages (optional):
# npm publish --access public
```

### 4. Verify Publication

After publishing, verify at:
- Package page: https://npmjs.com/package/tron-metamask-snap
- Installation test: `npm install tron-metamask-snap`

## Package Structure

The published package will include:
- `dist/bundle.js` - Compiled snap code
- `snap.manifest.json` - Snap configuration
- `images/icon.svg` - Snap icon
- `README.md` - Documentation
- `LICENSE` - MIT license

## MetaMask Snap Installation

Users can install your snap using:

```javascript
await ethereum.request({
  method: 'wallet_requestSnaps',
  params: {
    'npm:tron-metamask-snap': {}
  }
});
```

## Version Management

To publish updates:

1. Update version in `package.npm.json`
2. Rebuild: `npm run build`
3. Update shasum in `snap.manifest.json` if needed
4. Republish: `npm publish`

## Troubleshooting

### Package Name Taken
If `tron-metamask-snap` is taken, try:
- `@your-username/tron-metamask-snap`
- `tron-snap-metamask`
- `metamask-tron-snap`

### Permission Errors
Ensure you have publishing rights:
```bash
npm whoami
npm access list packages
```

### Build Errors
Verify all dependencies are installed:
```bash
npm install
npm run build
```

## Post-Publication

1. **Update Documentation**: Add the published package name to README
2. **Create GitHub Release**: Tag the published version
3. **Test Installation**: Verify the snap works when installed from npm
4. **Community**: Share on MetaMask Discord, TRON forums, etc.

## Important Notes

- The snap requires MetaMask Flask for development/testing
- Production users need MetaMask with Snaps support
- Consider publishing to MetaMask's official snap directory
- Monitor package downloads and user feedback

## Support

For publication issues:
- NPM Support: https://npmjs.com/support
- MetaMask Snaps: https://docs.metamask.io/snaps/
- TRON Developer Community: https://developers.tron.network/
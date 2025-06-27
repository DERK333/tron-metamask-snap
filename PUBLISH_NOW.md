# NPM Publication Commands

Run these commands in your terminal to publish your TRON Snap:

## Step 1: Login to NPM (if not already logged in)
```bash
npm login
```
Enter your npmjs.com username, password, and email when prompted.

## Step 2: Publish Your Package
```bash
npm publish
```

That's it! Your package will be published to npmjs.com.

## After Publication

Your snap will be available at:
- https://npmjs.com/package/tron-metamask-snap

Users can install it with:
```bash
npm install tron-metamask-snap
```

Or use it in MetaMask:
```javascript
await ethereum.request({
  method: 'wallet_requestSnaps',
  params: {
    'npm:tron-metamask-snap': {}
  }
});
```

## Package Details
- Name: tron-metamask-snap
- Version: 1.0.0
- Size: ~22 KB
- License: MIT

Your package includes all TRON functionality and authentication features.
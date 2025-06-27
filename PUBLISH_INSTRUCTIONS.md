# How to Publish Your TRON Snap to NPM

## Step-by-Step Instructions

### 1. Open the Shell Tab
Click on the "Shell" tab at the bottom of your Replit screen (not the Console tab).

### 2. Check Login Status
In the Shell, type:
```bash
npm whoami
```

If you see your username (drsamuel0rg), you're logged in and can skip to step 4.

### 3. Login to NPM (if needed)
If you're not logged in, type:
```bash
npm login
```

- It will show you a URL like: https://www.npmjs.com/login?next=/login/cli/[some-id]
- Click this URL
- Login with your npm credentials on the website
- After logging in on the website, go back to the Shell
- Press Enter to complete the login

### 4. Publish the Package
Once logged in, simply type:
```bash
npm publish
```

## What Happens Next

If successful, you'll see:
- "npm notice Publishing to https://registry.npmjs.org/"
- Your package will be available at: https://npmjs.com/package/tron-metamask-snap

## If You Get Errors

### Permission Error on Windows
If publishing from Windows, try:
1. Run Command Prompt as Administrator
2. Navigate to: `cd C:\TronMetaMaskIntegration`
3. Run: `npm publish`

### Alternative: Use npm Token
1. Go to: https://www.npmjs.com/settings/drsamuel0rg/tokens
2. Create a new "Classic Token" with "Publish" access
3. In the Shell, run:
```bash
npm config set //registry.npmjs.org/:_authToken YOUR_TOKEN_HERE
npm publish
```

## Your Package Details
- Name: tron-metamask-snap
- Version: 1.0.0
- Size: ~9 KB
- Files included: dist/bundle.js, snap.manifest.json, images/icon.svg

After publishing, users can install your snap with:
```javascript
await ethereum.request({
  method: 'wallet_requestSnaps',
  params: { 'npm:tron-metamask-snap': {} }
});
```
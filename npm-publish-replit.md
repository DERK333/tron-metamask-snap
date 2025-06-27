# Publishing from Replit Console

## Step 1: Open the Shell
Click on the "Shell" tab in Replit (not the Console tab)

## Step 2: Login to NPM
In the Shell, run:
```bash
npm login
```

This will give you a URL like:
https://www.npmjs.com/login?next=/login/cli/[some-id]

1. Click on this URL
2. Log in with your npmjs.com account
3. After logging in on the website, return to the Shell
4. Press Enter in the Shell to complete the login

## Step 3: Publish Your Package
Once logged in, run:
```bash
npm publish
```

## Alternative: Using Auth Token

If you prefer, you can also use an npm auth token:

1. Go to https://www.npmjs.com/settings/[your-username]/tokens
2. Create a new token (Classic Token with Publish access)
3. In the Replit Shell, run:
```bash
npm config set //registry.npmjs.org/:_authToken YOUR_TOKEN_HERE
npm publish
```

## What Will Be Published
- Package name: tron-metamask-snap
- Version: 1.0.0
- Files: dist/bundle.js, snap.manifest.json, images/

Your snap will be available at: https://npmjs.com/package/tron-metamask-snap
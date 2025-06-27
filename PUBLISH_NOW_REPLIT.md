# Publishing Your TRON Snap from Replit

## Important: Do NOT share your credentials in chat

To publish your package safely:

1. **Open the Shell tab** in Replit (not the Console)

2. **Login to npm** by running:
   ```bash
   npm login
   ```
   - When it shows a URL, click it
   - Login with your credentials on the npmjs.com website
   - Return to the Shell and press Enter

3. **Publish your package**:
   ```bash
   npm publish
   ```

Your package will be published as:
- Name: `tron-metamask-snap`
- Version: 1.0.0
- URL: https://npmjs.com/package/tron-metamask-snap

## Alternative: Using Auth Token (More Secure)

1. Login to npmjs.com
2. Go to: https://www.npmjs.com/settings/drsamuel0rg/tokens
3. Create a new "Classic Token" with "Publish" access
4. In the Replit Shell, run:
   ```bash
   npm config set //registry.npmjs.org/:_authToken YOUR_TOKEN_HERE
   npm publish
   ```

This method is more secure because tokens can be revoked and have limited scope.

After publishing, your snap will be installable with:
```javascript
await ethereum.request({
  method: 'wallet_requestSnaps',
  params: { 'npm:tron-metamask-snap': {} }
});
```
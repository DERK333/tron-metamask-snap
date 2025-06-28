# Secure GitHub Push Instructions

## Important: Don't use your GitHub password for git operations

GitHub now requires Personal Access Tokens instead of passwords for security.

## Steps to push your code:

1. **Create a Personal Access Token:**
   - Go to: https://github.com/settings/tokens/new
   - Token name: "TRON Snap Push"
   - Select scopes: ✓ repo (Full control of private repositories)
   - Click "Generate token"
   - **COPY THE TOKEN** (looks like: ghp_xxxxxxxxxxxx)

2. **Push your code:**
   ```bash
   git push -u origin main
   ```

3. **When prompted:**
   - Username: `Derk333`
   - Password: `[paste your token, not your GitHub password]`

## Why tokens instead of passwords?
- More secure
- Can be revoked without changing your password
- Limited permissions
- Required by GitHub for command line access

Your repository: https://github.com/Derk333/tron-metamask-snap
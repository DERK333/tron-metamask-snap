# Publishing to GitHub - Complete Guide

## Step 1: Push Your Code to GitHub

Since you're getting authentication errors, you need to use a GitHub token:

### Option A: Quick Push with Token
```bash
git push https://YOUR_GITHUB_USERNAME:YOUR_GITHUB_TOKEN@github.com/DERK333/tron-metamask-snap.git main
```

### Option B: Set Up Permanent Authentication
```bash
# Set the remote URL with your token
git remote set-url origin https://YOUR_GITHUB_USERNAME:YOUR_GITHUB_TOKEN@github.com/DERK333/tron-metamask-snap.git

# Then push normally
git push origin main
```

### How to Get a GitHub Token:
1. Go to GitHub.com and log in
2. Click your profile picture → Settings
3. Scroll down to "Developer settings" on the left
4. Click "Personal access tokens" → "Tokens (classic)"
5. Click "Generate new token (classic)"
6. Give it a name like "Replit Push"
7. Check the "repo" checkbox (this gives full repository access)
8. Click "Generate token" at the bottom
9. COPY THE TOKEN NOW - you won't see it again!

## Step 2: Create a GitHub Release (Optional but Recommended)

After pushing your code:

1. Go to https://github.com/DERK333/tron-metamask-snap
2. Click "Releases" on the right side
3. Click "Create a new release"
4. Click "Choose a tag" and type "v1.0.4"
5. Title: "v1.0.4 - Multilingual Support"
6. Description:
   ```
   ## What's New in v1.0.4
   
   - 🌍 Added multilingual support for 5 languages:
     - English (EN)
     - Chinese (CN)
     - Spanish (ES)
     - French (FR)
     - Japanese (JP)
   - 🔧 New API methods:
     - `tron_setLanguage` - Set user's preferred language
     - `tron_getLanguage` - Get current language setting
   - 💾 Language preferences are saved automatically
   - 📦 Bundle size: 70.1 KiB
   
   ## Installation
   
   ```bash
   npm install tron-metamask-snap@1.0.4
   ```
   
   ## Features
   - Complete TRON blockchain integration
   - Transaction previews with risk assessment
   - TRX staking for energy/bandwidth
   - Super Representative voting
   - dApp connectivity (TronLink compatible)
   - Now with full multilingual support!
   ```
7. Click "Publish release"

## Step 3: Verify Everything

Your package will be available at:
- GitHub: https://github.com/DERK333/tron-metamask-snap
- NPM: https://www.npmjs.com/package/tron-metamask-snap
- Release: https://github.com/DERK333/tron-metamask-snap/releases/tag/v1.0.4

## Current Status
- ✅ Code is committed locally
- ✅ NPM package published (v1.0.4)
- ⏳ Needs to be pushed to GitHub
- ⏳ GitHub release can be created after push
# GitHub Repository Setup Instructions

## Step 1: Create Repository on GitHub

1. Go to https://github.com/new
2. Repository name: `tron-metamask-snap`
3. Description: "TRON blockchain integration for MetaMask - manage TRON accounts, send transactions, and connect with dApps"
4. Make it **Public** (required for npm packages)
5. **Don't** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

## Step 2: Push Your Code to GitHub

After creating the empty repository, run these commands in your terminal:

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit your code
git commit -m "Initial commit - TRON MetaMask Snap v1.0.2"

# Add your GitHub repository as origin
git remote add origin https://github.com/Derk333/tron-metamask-snap.git

# Push to GitHub
git push -u origin main
```

If your default branch is called 'master' instead of 'main':
```bash
git push -u origin master
```

## Step 3: Verify Repository

Once pushed, your repository will be available at:
https://github.com/Derk333/tron-metamask-snap

## Important Files to Include

Make sure these files are in your repository:
- ✅ package.json (with your GitHub info)
- ✅ README.md
- ✅ LICENSE
- ✅ dist/bundle.js (the built snap)
- ✅ snap.manifest.json
- ✅ src/ (source code)
- ✅ images/icon.svg

## After GitHub Setup

Your npm package already references this repository, so once it's created and your code is pushed, everything will be properly linked!
#!/bin/bash

echo "📦 Pushing TRON Snap to GitHub"
echo "=============================="
echo ""

# Initialize git if needed
if [ ! -d .git ]; then
    echo "Initializing git repository..."
    git init
fi

# Configure git (optional - skip if already configured)
# git config user.name "Derk333"
# git config user.email "damailman@dmail.ai"

# Add all files
echo "Adding files to git..."
git add .

# Create commit
echo "Creating commit..."
git commit -m "Initial commit - TRON MetaMask Snap v1.0.2

- Complete TRON blockchain integration for MetaMask
- Support for mainnet and testnet
- Transaction signing and account management
- dApp connection system (TronLink compatible)
- NPM package: tron-metamask-snap"

# Add remote repository
echo "Adding GitHub repository..."
git remote add origin https://github.com/Derk333/tron-metamask-snap.git

# Push to GitHub
echo "Pushing to GitHub..."
git push -u origin main

# If the above fails because your branch is 'master', try:
# git push -u origin master

echo ""
echo "✅ Done! Your code should now be on GitHub at:"
echo "https://github.com/Derk333/tron-metamask-snap"
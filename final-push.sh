#!/bin/bash

echo "📦 Pushing TRON Snap to GitHub"
echo "=============================="
echo ""
echo "Using your Personal Access Token..."
echo ""

# Set the remote with token (temporarily)
git remote set-url origin https://Derk333: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@github.com/Derk333/tron-metamask-snap.git

# Push to GitHub
echo "Pushing to main branch..."
git push -u origin main

# Remove token from remote for security
echo ""
echo "Cleaning up..."
git remote set-url origin https://github.com/Derk333/tron-metamask-snap.git

echo ""
echo "✅ Done! Your code should now be at:"
echo "https://github.com/Derk333/tron-metamask-snap"
echo ""
echo "⚠️  For security, the token has been removed from git config."
echo "Keep your token safe for future use!"
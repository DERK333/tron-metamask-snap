#!/bin/bash

echo "Push to GitHub with Token Authentication"
echo "========================================"
echo ""
echo "Use this command (replace YOUR_GITHUB_TOKEN with your actual token):"
echo ""
echo "git push https://DERK333:YOUR_GITHUB_TOKEN@github.com/DERK333/tron-metamask-snap.git main"
echo ""
echo "If you don't have a token yet:"
echo "1. Go to GitHub.com → Settings → Developer settings"
echo "2. Personal access tokens → Tokens (classic)"
echo "3. Generate new token with 'repo' permissions"
echo "4. Copy the token and use it in the command above"
echo ""
echo "Your commits are ready to push:"
git log --oneline -n 3
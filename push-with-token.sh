#!/bin/bash

echo "GitHub Push with Personal Access Token"
echo "======================================"
echo ""
echo "You need a Personal Access Token (not your password)"
echo ""
echo "1. Go to: https://github.com/settings/tokens/new"
echo "2. Create token with 'repo' permissions"
echo "3. Copy the token (starts with ghp_)"
echo ""
echo "Ready to push? (y/n)"
read -p "> " READY

if [ "$READY" = "y" ]; then
    echo ""
    echo "Pushing to GitHub..."
    echo "Username: Derk333"
    echo "Password: [paste your token when prompted]"
    echo ""
    git push -u origin main
else
    echo "Create your token first at: https://github.com/settings/tokens/new"
fi
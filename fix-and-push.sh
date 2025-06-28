#!/bin/bash

echo "🔧 Fixing Git and Pushing to GitHub"
echo "==================================="
echo ""

# First, let's check if we already have a remote
echo "Checking current git remotes..."
git remote -v

# If origin exists, remove it first
if git remote | grep -q 'origin'; then
    echo "Removing existing origin..."
    git remote remove origin
fi

# Add the correct remote
echo "Adding GitHub repository..."
git remote add origin https://github.com/Derk333/tron-metamask-snap.git

# Check current branch
BRANCH=$(git branch --show-current)
echo "Current branch: $BRANCH"

# Try to push
echo "Pushing to GitHub..."
git push -u origin $BRANCH

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Success! Your code is now on GitHub at:"
    echo "https://github.com/Derk333/tron-metamask-snap"
else
    echo ""
    echo "If the push failed, try these manual steps:"
    echo "1. Remove git lock files:"
    echo "   rm -f .git/config.lock .git/index.lock"
    echo ""
    echo "2. Then run:"
    echo "   git remote remove origin"
    echo "   git remote add origin https://github.com/Derk333/tron-metamask-snap.git"
    echo "   git push -u origin main"
fi
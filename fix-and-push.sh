#!/bin/bash

echo "Fixing git and pushing to GitHub..."
echo ""

# Remove any lock files
rm -f .git/config.lock
rm -f .git/objects/maintenance.lock

# Pull with merge strategy
git pull https://Derk333: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@github.com/Derk333/tron-metamask-snap.git main --strategy=ours --allow-unrelated-histories

# Push to GitHub
git push https://Derk333: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@github.com/Derk333/tron-metamask-snap.git main

echo ""
echo "Done! Check your repository at:"
echo "https://github.com/Derk333/tron-metamask-snap"
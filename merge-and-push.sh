#!/bin/bash

# Remove lock files
rm -f .git/index.lock
rm -f .git/config.lock

# Pull with merge strategy specified directly
git pull https://DERK333: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@github.com/DERK333/tron-metamask-snap.git main --no-rebase --no-edit

# Push the merged changes
git push https://DERK333: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@github.com/DERK333/tron-metamask-snap.git main

# Create and push tag
git tag -a v1.0.7 -m "Version 1.0.7: Fixed bundle issue"
git push https://DERK333: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@github.com/DERK333/tron-metamask-snap.git v1.0.7
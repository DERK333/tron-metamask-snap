#!/bin/bash

# Pull the latest changes from GitHub
git pull https://DERK333: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@github.com/DERK333/tron-metamask-snap.git main

# Push your changes
git push https://DERK333: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@github.com/DERK333/tron-metamask-snap.git main

# Create and push the v1.0.7 tag
git tag -a v1.0.7 -m "Version 1.0.7: Fixed bundle issue"
git push https://DERK333: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@github.com/DERK333/tron-metamask-snap.git v1.0.7
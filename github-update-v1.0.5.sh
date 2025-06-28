#!/bin/bash

echo "Update GitHub with v1.0.5"
echo "========================"
echo ""
echo "Run these commands to update GitHub:"
echo ""
echo "# 1. Add the v1.0.5 files"
echo "git add snap.manifest.json package-v1.0.5.json npm-publish-v1.0.5.md"
echo ""
echo "# 2. Commit the changes"
echo 'git commit -m "Release v1.0.5: Fix npm package bundle issue

- Updated manifest to v1.0.5
- Fixed bundle shasum mismatch issue
- Snap now installs correctly in MetaMask
- Bundle size: 70.1 KiB with all features"'
echo ""
echo "# 3. Push to GitHub with your token"
echo "git push https://DERK333:YOUR_GITHUB_TOKEN@github.com/DERK333/tron-metamask-snap.git main"
echo ""
echo "# 4. Create a release tag (optional)"
echo "git tag -a v1.0.5 -m \"Version 1.0.5: Fixed npm bundle issue\""
echo "git push https://DERK333:YOUR_GITHUB_TOKEN@github.com/DERK333/tron-metamask-snap.git v1.0.5"
echo ""
echo "Remember to replace YOUR_GITHUB_TOKEN with your actual GitHub personal access token!"
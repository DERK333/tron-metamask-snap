# Secure GitHub Push Instructions

Since GitHub detected your token in the files, we need to clean up and push.

## Run these commands in order:

1. Remove files containing the token:
```bash
rm -f final-push.sh fix-and-push.sh quick-github-steps.txt push-from-replit.sh windows-push.txt manual-push-commands.txt push-with-token.sh
```

2. Stage the removal:
```bash
git add -A
```

3. Commit the cleanup:
```bash
git commit -m "Remove files containing sensitive information"
```

4. Force push to override:
```bash
git push https://Derk333:YOUR_TOKEN@github.com/Derk333/tron-metamask-snap.git main --force
```

Replace YOUR_TOKEN with: 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

Your repository will be updated at:
https://github.com/Derk333/tron-metamask-snap
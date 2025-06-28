#!/bin/bash

echo "Publishing TRON Snap v1.0.5 to fix installation issue"
echo ""
echo "Step 1: Update package.json"
cp package-v1.0.5.json package.json

echo "Step 2: Publish to npm"
echo "Run this command:"
echo ""
echo "npm publish"
echo ""
echo "When prompted, enter your npm One-Time Password (OTP)"
echo ""
echo "After publishing, wait 1-2 minutes, then the snap will work in MetaMask!"
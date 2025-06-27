#!/bin/bash

# TRON Snap NPM Publication Script
# Run this script to publish your snap to npmjs.com

echo "🚀 Publishing TRON MetaMask Snap to NPM"
echo "======================================"

# Check if user is logged in to npm
echo "Checking npm login status..."
npm whoami > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "❌ You need to login to npm first"
    echo "Run: npm login"
    exit 1
fi

echo "✅ Logged in as: $(npm whoami)"

# Verify package contents
echo ""
echo "📦 Package contents:"
echo "- dist/bundle.js (21.6 KB)"
echo "- snap.manifest.json"
echo "- images/icon.svg"
echo "- README.md"
echo "- LICENSE"

# Show package info
echo ""
echo "📋 Package information:"
echo "- Name: tron-metamask-snap"
echo "- Version: 1.0.0"
echo "- License: MIT"

# Confirm publication
echo ""
read -p "Ready to publish? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "📤 Publishing to npm..."
    npm publish
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Successfully published!"
        echo "🎉 Your snap is now available at: https://npmjs.com/package/tron-metamask-snap"
        echo ""
        echo "Users can now install it with:"
        echo "npm install tron-metamask-snap"
        echo ""
        echo "Or use it in MetaMask with:"
        echo "await ethereum.request({"
        echo "  method: 'wallet_requestSnaps',"
        echo "  params: { 'npm:tron-metamask-snap': {} }"
        echo "});"
    else
        echo "❌ Publication failed. Please check the error above."
    fi
else
    echo "Publication cancelled."
fi
#!/bin/bash

echo "🚀 Publishing TRON Snap to NPM"
echo "=============================="
echo ""

# Check if logged in
npm whoami > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "❌ You need to login first!"
    echo ""
    echo "Run: npm login"
    echo "Then run this script again: ./publish.sh"
    exit 1
fi

echo "✅ Logged in as: $(npm whoami)"
echo ""
echo "Publishing package..."
echo ""

# Publish the package
npm publish --access public

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Success! Your snap is now published!"
    echo ""
    echo "View it at: https://npmjs.com/package/tron-metamask-snap"
    echo ""
    echo "Users can install it with:"
    echo "npm install tron-metamask-snap"
else
    echo ""
    echo "❌ Publishing failed. Please check the error above."
fi
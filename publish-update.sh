#!/bin/bash

echo "📦 Publishing TRON Snap Update (v1.0.1)"
echo "====================================="
echo ""
echo "Updates:"
echo "- Author: Derk333"
echo "- GitHub: https://github.com/Derk333/tron-metamask-snap"
echo ""

# Check npm login
npm whoami > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ Logged in as: $(npm whoami)"
    echo ""
    echo "Publishing update..."
    npm publish
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "🎉 Successfully published version 1.0.1!"
        echo ""
        echo "Your package is updated at: https://npmjs.com/package/tron-metamask-snap"
        echo "GitHub repository: https://github.com/Derk333/tron-metamask-snap"
    fi
else
    echo "❌ Please login first: npm login"
fi
#!/bin/bash

echo "📦 Publishing TRON Snap v1.0.2"
echo "================================"
echo ""
echo "Updates in v1.0.2:"
echo "- Support email: damailman@dmail.ai"
echo "- Author: Derk333 <damailman@dmail.ai>"
echo ""

# Check if we need OTP
npm whoami > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ Logged in as: $(npm whoami)"
    echo ""
    
    # Try publishing without OTP first
    echo "Publishing..."
    npm publish 2>&1 | tee /tmp/npm-publish.log
    
    # Check if OTP is required
    if grep -q "one-time password" /tmp/npm-publish.log; then
        echo ""
        echo "📱 Two-factor authentication required"
        echo "Please enter your npm OTP code:"
        read -p "OTP: " OTP_CODE
        
        if [ -n "$OTP_CODE" ]; then
            npm publish --otp=$OTP_CODE
        fi
    fi
    
    if [ ${PIPESTATUS[0]} -eq 0 ]; then
        echo ""
        echo "🎉 Successfully published version 1.0.2!"
        echo ""
        echo "Package: https://npmjs.com/package/tron-metamask-snap"
        echo "Support: damailman@dmail.ai"
    fi
else
    echo "❌ Please login first: npm login"
fi
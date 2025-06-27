#!/bin/bash

echo "📦 Publishing TRON Snap Update (v1.0.1) with OTP"
echo "=============================================="
echo ""
echo "Please enter your npm OTP code from your authenticator app:"
read -p "OTP Code: " OTP_CODE

if [ -z "$OTP_CODE" ]; then
    echo "❌ OTP code is required"
    exit 1
fi

echo ""
echo "Publishing with OTP..."
npm publish --otp=$OTP_CODE

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Successfully published version 1.0.1!"
    echo ""
    echo "Your package is updated at: https://npmjs.com/package/tron-metamask-snap"
    echo "GitHub repository: https://github.com/Derk333/tron-metamask-snap"
else
    echo "❌ Publishing failed. Please check your OTP code and try again."
fi
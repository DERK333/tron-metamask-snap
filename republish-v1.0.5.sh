#!/bin/bash

echo "Republishing v1.0.5 with correct bundle"
echo "======================================="
echo ""
echo "The problem: npm has wrong bundle file"
echo "The solution: Republish with correct bundle"
echo ""
echo "Step 1: Copy the correct package.json"
cp package-v1.0.5.json package.json

echo ""
echo "Step 2: Verify bundle is correct (should show matching shasums)"
echo "Expected: vY26N94hEDgSa0j26KIeSK2Lo+EyInRwPWjgDW9OWw0="
node -e "const crypto = require('crypto'); const fs = require('fs'); const content = fs.readFileSync('dist/bundle.js'); const hash = crypto.createHash('sha256').update(content).digest('base64'); console.log('Current:  ' + hash);"

echo ""
echo "Step 3: Force republish to npm"
echo "Run this command:"
echo ""
echo "npm publish --force"
echo ""
echo "This will overwrite the existing v1.0.5 with the correct bundle."
echo "Enter your npm OTP when prompted."
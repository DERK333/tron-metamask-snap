# Publishing TRON MetaMask Snap v1.0.4

## What's New
✓ Multilingual support for 5 languages (EN, CN, ES, FR, JP)  
✓ Language auto-detection and persistence  
✓ All UI dialogs translated  
✓ New API methods: tron_setLanguage, tron_getLanguage  

## Files Ready
- Bundle: 70.1 KiB (dist/bundle.js)
- Manifest: Updated with new shasum
- Package: v1.0.4 configured

## Quick Publish Commands

```bash
# 1. Set package.json
cp package-v1.0.4.json package.json

# 2. Login to npm (if needed)
npm login

# 3. Publish to npm
npm publish

# 4. Restore original package.json
git checkout package.json
```

## Testing Multilingual Support

After publishing, users can:
- Set language: `tron_setLanguage({ language: 'zh' })`
- Get language: `tron_getLanguage()`
- Languages: en, zh, es, fr, ja

View the demo at: multilingual-demo.html
#!/bin/bash

echo "GitHub Repository Update for TRON Snap v1.0.4"
echo "============================================="
echo ""
echo "This script will help you push all the latest changes to GitHub"
echo ""

# First, check git status
echo "1. Current git status:"
echo "   git status"
echo ""

# Add all new files
echo "2. Add all changes:"
echo "   git add -A"
echo ""

# Commit with detailed message
echo "3. Commit changes:"
cat << 'EOF'
   git commit -m "Release v1.0.4: Add multilingual support

- Added comprehensive i18n system supporting 5 languages:
  * English (EN)
  * Chinese Simplified (中文)
  * Spanish (Español) 
  * French (Français)
  * Japanese (日本語)
- Created translation service with language detection and persistence
- Implemented all UI strings with translation keys
- Added API methods: tron_setLanguage and tron_getLanguage
- Language preference stored in snap state
- Fallback to English for untranslated strings
- Created multilingual demo page
- Updated bundle size to 70.1 KiB
- Updated manifest with new shasum: vY26N94hEDgSa0j26KIeSK2Lo+EyInRwPWjgDW9OWw0=

Files added/modified:
- src/i18n/translations.ts
- src/i18n/i18n.ts
- src/i18n/languageDefaults.ts
- multilingual-demo.html
- Updated src/index.ts with translation support
- Updated README.md with v1.0.4 changelog
- Updated snap.manifest.json to v1.0.4
- Updated replit.md with implementation details"
EOF
echo ""

# Push to GitHub
echo "4. Push to GitHub:"
echo "   git push origin main"
echo ""
echo "Or if you need to force push:"
echo "   git push origin main --force"
echo ""

echo "5. Create a release tag (optional):"
echo "   git tag -a v1.0.4 -m \"Release version 1.0.4: Multilingual support\""
echo "   git push origin v1.0.4"
echo ""

echo "Files ready for GitHub:"
echo "- src/i18n/ (new translation system)"
echo "- multilingual-demo.html (demo page)"
echo "- dist/bundle.js (70.1 KiB)"
echo "- snap.manifest.json (v1.0.4)"
echo "- README.md (updated changelog)"
echo "- All other modified files"
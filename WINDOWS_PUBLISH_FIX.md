# Windows NPM Publish Permission Fix

## Quick Solutions

### Option 1: Run as Administrator
1. Open Command Prompt as Administrator (right-click → Run as administrator)
2. Navigate to your project: `cd C:\Users\derek\your-project-path`
3. Run: `npm publish`

### Option 2: Clear NPM Cache
```cmd
npm cache clean --force
npm publish
```

### Option 3: Use Different Temp Directory
```cmd
set npm_config_tmp=C:\temp
mkdir C:\temp
npm publish
```

### Option 4: Use the Batch Script
Run the `npm-publish-windows.cmd` file I created:
```cmd
npm-publish-windows.cmd
```

### Option 5: Bypass Cache Entirely
```cmd
npm publish --cache C:\temp\npm-cache --prefer-offline false
```

## If Still Having Issues

Try publishing with more specific options:
```cmd
npm publish --registry https://registry.npmjs.org/ --access public
```

Or disable Windows Defender temporarily for the npm folders.

The error you're seeing is common on Windows when antivirus or system permissions block npm from accessing temp directories.
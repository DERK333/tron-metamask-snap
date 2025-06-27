@echo off
REM TRON Snap NPM Publication Script for Windows
REM This script helps bypass Windows permission issues

echo Publishing TRON MetaMask Snap to NPM
echo ======================================

REM Set a different temp directory to avoid permission issues
set npm_config_tmp=C:\temp\npm
if not exist C:\temp\npm mkdir C:\temp\npm

REM Check if logged in
npm whoami >nul 2>&1
if errorlevel 1 (
    echo You need to login to npm first
    echo Run: npm login
    exit /b 1
)

echo Logged in as: 
npm whoami

echo.
echo Publishing package...
npm publish --verbose

if errorlevel 0 (
    echo.
    echo Successfully published!
    echo Your snap is now available at: https://npmjs.com/package/tron-metamask-snap
) else (
    echo.
    echo Publication failed. Please check the error above.
)
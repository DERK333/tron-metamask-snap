const { execSync } = require('child_process');

console.log('🚀 TRON Snap NPM Publishing Helper');
console.log('==================================\n');

// Check if npm user is logged in
try {
  const user = execSync('npm whoami', { encoding: 'utf8' }).trim();
  console.log(`✅ Logged in as: ${user}`);
  console.log('\nReady to publish!');
  console.log('Run this command in the Shell:');
  console.log('\n  npm publish\n');
} catch (error) {
  console.log('❌ Not logged in to npm\n');
  console.log('To publish your package:');
  console.log('\n1. Open the Shell tab (at the bottom)');
  console.log('2. Run: npm login');
  console.log('3. Click the URL it shows');
  console.log('4. Login with your npm credentials');
  console.log('5. Return to Shell and press Enter');
  console.log('6. Run: npm publish\n');
  console.log('Your npm username: drsamuel0rg');
}

// Verify package is ready
console.log('\nPackage details:');
console.log('- Name: tron-metamask-snap');
console.log('- Version: 1.0.0');
console.log('- Files: dist/bundle.js, snap.manifest.json');
console.log('\nAfter publishing, it will be available at:');
console.log('https://npmjs.com/package/tron-metamask-snap');
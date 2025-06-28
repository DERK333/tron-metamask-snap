const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 5001;

// Enable CORS for MetaMask
app.use(cors());

// Serve snap manifest at root
app.get('/snap.manifest.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'snap.manifest.json'));
});

// Serve bundle at root
app.get('/bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/bundle.js'));
});

// Serve icon
app.get('/images/icon.svg', (req, res) => {
  res.sendFile(path.join(__dirname, 'images/icon.svg'));
});

// Serve root
app.get('/', (req, res) => {
  res.json({ 
    name: 'TRON MetaMask Snap',
    version: '1.0.2',
    manifest: '/snap.manifest.json',
    bundle: '/bundle.js'
  });
});

app.listen(PORT, () => {
  console.log(`Snap server running on http://localhost:${PORT}`);
  console.log(`Use snap ID: local:http://localhost:${PORT}`);
});
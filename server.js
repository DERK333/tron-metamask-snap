const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

// Serve static files
app.use(express.static('.'));

// Serve the snap bundle
app.get('/dist/bundle.js', (req, res) => {
  const bundlePath = path.join(__dirname, 'dist', 'bundle.js');
  if (fs.existsSync(bundlePath)) {
    res.sendFile(bundlePath);
  } else {
    res.status(404).send('Snap bundle not found');
  }
});

// Serve the snap manifest
app.get('/snap.manifest.json', (req, res) => {
  const manifestPath = path.join(__dirname, 'snap.manifest.json');
  if (fs.existsSync(manifestPath)) {
    res.sendFile(manifestPath);
  } else {
    res.status(404).send('Snap manifest not found');
  }
});

// Serve the main page
app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.send(`
      <html>
        <head><title>TRON Snap for MetaMask</title></head>
        <body>
          <h1>TRON Snap for MetaMask</h1>
          <p>Snap bundle: <a href="/dist/bundle.js">bundle.js</a></p>
          <p>Manifest: <a href="/snap.manifest.json">snap.manifest.json</a></p>
          <p>The TRON snap is ready for installation in MetaMask Flask.</p>
        </body>
      </html>
    `);
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`TRON Snap server running on http://localhost:${PORT}`);
});
const express = require('express');
const path = require('path');

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.static('public'));

// Serve the demo page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'demo.html'));
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'TRON Snap server is running' });
});

// Basic API endpoints for demo
app.get('/api/snap/info', (req, res) => {
  res.json({
    name: 'TRON MetaMask Snap',
    version: '1.0.0',
    description: 'TRON blockchain integration for MetaMask',
    features: [
      'Account management',
      'Transaction sending',
      'Message signing',
      'dApp connections',
      'Network switching'
    ]
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`TRON Snap server running on http://0.0.0.0:${port}`);
  console.log('Demo available at: http://localhost:5000');
});
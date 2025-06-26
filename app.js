const express = require('express');
const { registerRoutes } = require('./server/routes');

const app = express();
const port = 5000;

app.use(express.json());

async function startServer() {
  try {
    const httpServer = await registerRoutes(app);
    
    httpServer.listen(port, '0.0.0.0', () => {
      console.log(`TRON Snap Auth server running on http://0.0.0.0:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
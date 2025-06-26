const express = require('express');
const session = require('express-session');
const passport = require('passport');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static('public'));

// Simple session configuration for demo
app.use(session({
  secret: process.env.SESSION_SECRET || 'demo-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // Set to true in production with HTTPS
    maxAge: 7 * 24 * 60 * 60 * 1000 // 1 week
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// Mock authentication strategy for demo
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Auth routes
app.get('/api/login', (req, res) => {
  // Simulate Replit Auth login
  const mockUser = {
    id: '123456',
    email: 'demo@example.com',
    firstName: 'Demo',
    lastName: 'User',
    profileImageUrl: 'https://via.placeholder.com/40x40'
  };
  
  req.login(mockUser, (err) => {
    if (err) return res.status(500).json({ error: 'Login failed' });
    res.redirect('/');
  });
});

app.get('/api/logout', (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ error: 'Logout failed' });
    res.redirect('/');
  });
});

app.get('/api/auth/user', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  res.json(req.user);
});

// Main route
app.get('/', (req, res) => {
  const isAuthenticated = req.isAuthenticated();
  const user = req.user || {};
  
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TRON Snap - MetaMask TRON Integration</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50">
    ${isAuthenticated ? `
    <!-- Authenticated View -->
    <div class="min-h-screen">
        <nav class="bg-white shadow-sm border-b">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16">
                    <div class="flex items-center">
                        <h1 class="text-xl font-semibold text-gray-900">TRON Snap Dashboard</h1>
                    </div>
                    <div class="flex items-center space-x-4">
                        ${user.profileImageUrl ? `
                            <img src="${user.profileImageUrl}" alt="Profile" class="h-8 w-8 rounded-full object-cover">
                        ` : ''}
                        <span class="text-sm text-gray-700">${user.firstName || user.email || 'User'}</span>
                        <a href="/api/logout" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                            Sign Out
                        </a>
                    </div>
                </div>
            </div>
        </nav>

        <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div class="px-4 py-6 sm:px-0">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    
                    <div class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="p-5">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                        <span class="text-white font-semibold text-sm">T</span>
                                    </div>
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="text-sm font-medium text-gray-500 truncate">TRON Wallet</dt>
                                        <dd class="text-lg font-medium text-gray-900">Connect MetaMask Snap</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div class="bg-gray-50 px-5 py-3">
                            <button onclick="connectTronSnap()" class="font-medium text-blue-600 hover:text-blue-500">
                                Install TRON Snap
                            </button>
                        </div>
                    </div>

                    <div class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="p-5">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                        <span class="text-white font-semibold text-sm">$</span>
                                    </div>
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="text-sm font-medium text-gray-500 truncate">Balance</dt>
                                        <dd class="text-lg font-medium text-gray-900">0.00 TRX</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div class="bg-gray-50 px-5 py-3">
                            <button class="font-medium text-green-600 hover:text-green-500">
                                View transactions
                            </button>
                        </div>
                    </div>

                    <div class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="p-5">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <div class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                                        <span class="text-white font-semibold text-sm">D</span>
                                    </div>
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="text-sm font-medium text-gray-500 truncate">dApp Connections</dt>
                                        <dd class="text-lg font-medium text-gray-900">0 Active</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div class="bg-gray-50 px-5 py-3">
                            <button class="font-medium text-purple-600 hover:text-purple-500">
                                Manage connections
                            </button>
                        </div>
                    </div>
                </div>

                <div class="mt-8">
                    <div class="bg-white shadow rounded-lg">
                        <div class="px-4 py-5 sm:p-6">
                            <h3 class="text-lg leading-6 font-medium text-gray-900">Getting Started</h3>
                            <div class="mt-2 max-w-xl text-sm text-gray-500">
                                <p>Connect your TRON wallet through MetaMask to start managing your TRON assets and interacting with dApps.</p>
                            </div>
                            <div class="mt-5">
                                <button onclick="connectTronSnap()" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                    Install TRON Snap
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
    ` : `
    <!-- Landing View -->
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-gray-900 mb-2">TRON Snap</h1>
                <p class="text-gray-600">Connect your TRON wallet through MetaMask with secure authentication</p>
            </div>
            
            <div class="mb-6">
                <div class="bg-blue-50 rounded-lg p-4 mb-4">
                    <h3 class="font-semibold text-blue-900 mb-2">Features</h3>
                    <ul class="text-sm text-blue-800 space-y-1">
                        <li>• Secure TRON account management</li>
                        <li>• Transaction signing and sending</li>
                        <li>• dApp connection support</li>
                        <li>• Multi-network support</li>
                    </ul>
                </div>
            </div>

            <a href="/api/login" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 block">
                Sign In to Get Started
            </a>
            
            <p class="text-xs text-gray-500 mt-4">Secure authentication powered by your account</p>
        </div>
    </div>
    `}

    <script>
        async function connectTronSnap() {
            try {
                if (typeof window.ethereum === 'undefined') {
                    alert('MetaMask is not installed. Please install MetaMask to use TRON Snap.');
                    return;
                }

                const snapId = 'npm:tron-snap';
                await window.ethereum.request({
                    method: 'wallet_requestSnaps',
                    params: {
                        [snapId]: {}
                    }
                });

                alert('TRON Snap installed successfully! You can now manage your TRON assets.');
            } catch (error) {
                console.error('Error installing TRON Snap:', error);
                alert('Failed to install TRON Snap. Please try again.');
            }
        }

        // Check if user is authenticated for client-side features
        const isAuthenticated = ${isAuthenticated};
        if (isAuthenticated) {
            console.log('User authenticated. TRON Snap features available.');
        }
    </script>
</body>
</html>`;
  
  res.send(html);
});

const port = 5000;
app.listen(port, '0.0.0.0', () => {
  console.log(`TRON Snap Auth server running on http://0.0.0.0:${port}`);
});

module.exports = app;
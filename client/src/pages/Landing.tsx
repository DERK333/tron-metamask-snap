import React from 'react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">TRON Snap</h1>
          <p className="text-gray-600">
            Connect your TRON wallet through MetaMask with secure authentication
          </p>
        </div>
        
        <div className="mb-6">
          <div className="bg-blue-50 rounded-lg p-4 mb-4">
            <h3 className="font-semibold text-blue-900 mb-2">Features</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Secure TRON account management</li>
              <li>• Transaction signing and sending</li>
              <li>• dApp connection support</li>
              <li>• Multi-network support</li>
            </ul>
          </div>
        </div>

        <a
          href="/api/login"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
        >
          Sign In to Get Started
        </a>
        
        <p className="text-xs text-gray-500 mt-4">
          Secure authentication powered by your account
        </p>
      </div>
    </div>
  );
}
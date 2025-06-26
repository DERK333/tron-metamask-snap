# Tron BlockChain - MetaMask Snap

A comprehensive MetaMask Snap that brings TRON blockchain functionality directly to your MetaMask wallet. This snap enables seamless interaction with the TRON network, dApp connectivity, and transaction management through MetaMask's secure environment.

## 🌟 Features

### Core TRON Integration
- **Account Management**: Create and manage TRON accounts derived from MetaMask's entropy
- **Network Support**: Switch between TRON mainnet and testnet networks
- **Balance Queries**: Real-time TRX balance checking and display
- **Transaction Processing**: Send TRX transactions with proper fee calculation
- **Message Signing**: Cryptographically sign messages using TRON standards

### dApp Connectivity
- **TronLink Compatibility**: Mimics TronLink's API for seamless dApp integration
- **Session Management**: Secure origin-based session tracking and approval
- **Global tron Object**: Provides `window.tron` object for dApp compatibility
- **Connection Approval**: User-controlled dApp connection workflows
- **Multi-dApp Support**: Manage multiple connected dApps simultaneously

### Database Integration
- **PostgreSQL Backend**: Persistent storage for user data and sessions
- **Transaction History**: Complete transaction tracking and retrieval
- **Session Persistence**: Maintain dApp connections across browser sessions
- **Signed Message Storage**: Keep records of all signed messages
- **User Management**: Automatic user creation and management

### Security Features
- **User Approval Dialogs**: Explicit user consent for all operations
- **Origin Validation**: Secure origin-based access control
- **Private Key Security**: Keys never leave MetaMask's secure environment
- **Transaction Verification**: All transactions require user approval

## 🚀 Installation

### Prerequisites
- MetaMask Flask (development version of MetaMask)
- Node.js 18+ and npm
- PostgreSQL database (automatically configured in Replit)

### Quick Start
1. **Install the Snap**:
   ```
   npm install
   npm run build
   npm start
   ```

2. **Connect to MetaMask Flask**:
   - Open MetaMask Flask
   - Navigate to the snap URL
   - Click "Connect" to install the snap

3. **Start Using TRON**:
   - Create your TRON account
   - Check balance
   - Send transactions
   - Connect dApps

## 🏗️ Architecture

### Core Components

#### **Snap Entry Point** (`src/index.ts`)
The main RPC request handler that routes incoming requests from dApps and MetaMask UI. Supports methods:
- `tron_connect` - Create/retrieve TRON account
- `tron_getAccount` - Get current account information
- `tron_getBalance` - Check TRX balance
- `tron_sendTransaction` - Send TRX transactions
- `tron_signMessage` - Sign messages
- `tron_getTransactionHistory` - Retrieve transaction history
- `tron_switchNetwork` - Switch between mainnet/testnet
- `tron_dapp_connect` - Connect dApps
- `tron_dapp_sessions` - Manage dApp sessions
- `tron_dapp_disconnect` - Disconnect dApps

#### **TRON Service Layer** (`src/tron.ts`)
Core blockchain interaction logic:
- Account derivation using BIP44 and MetaMask's key tree
- TRON API integration (TronGrid endpoints)
- Transaction creation, signing, and broadcasting
- Network management and switching
- Balance queries and formatting

#### **dApp Connector** (`src/dapp-connector.ts`)
TronLink-style dApp integration:
- Session management with origin-based security
- Global `window.tron` object implementation
- Connection approval workflows
- Event listener management
- Multi-dApp session tracking

#### **Database Service** (`src/database.ts`)
PostgreSQL integration for persistence:
- User creation and management
- dApp session storage
- Transaction history tracking
- Signed message records
- Fallback to snap state storage

#### **Utilities** (`src/utils.ts`)
Helper functions for:
- TRON address validation and formatting
- Amount conversion (TRX ↔ SUN)
- Transaction fee calculation
- Error message parsing
- Input sanitization

### Build System
- **TypeScript**: Strict type checking with ES2020 target
- **Webpack**: Bundles all code into a single JavaScript file
- **ESLint**: Code quality and style enforcement
- **Production Optimization**: Minification and tree shaking

## 🌐 Network Integration

### TRON API Endpoints
- **Mainnet**: `https://api.trongrid.io`
- **Testnet**: `https://api.shasta.trongrid.io`

### Supported Operations
- Account creation and retrieval
- Balance queries
- Transaction broadcasting
- Transaction history
- Network information

## 🔐 Security Model

### Key Management
- Private keys derived from MetaMask's entropy using BIP44 path
- Keys never leave MetaMask's secure environment
- Deterministic account generation

### Permission System
- **Dialog Display**: Show user approval dialogs
- **State Management**: Store encrypted data in snap state
- **Network Access**: Connect to TRON APIs
- **RPC Handling**: Process dApp requests
- **Notifications**: Alert users of important events

### User Consent
- All transactions require explicit user approval
- dApp connections need user permission
- Message signing requires confirmation
- Network switching needs user consent

## 📊 Database Schema

### Users Table
```sql
- id: Primary key
- address: TRON address
- network: Current network (mainnet/testnet)
- createdAt: Account creation timestamp
```

### Sessions Table
```sql
- id: Primary key
- userId: Foreign key to users
- origin: dApp origin URL
- name: dApp display name
- icon: dApp icon URL
- chainId: Network chain ID
- isActive: Session status
- connectedAt: Connection timestamp
- lastAccessAt: Last activity timestamp
```

### Transactions Table
```sql
- id: Primary key
- userId: Foreign key to users
- sessionId: Foreign key to sessions (optional)
- txId: Transaction hash
- type: Transaction type
- amount: Transaction amount
- toAddress: Recipient address
- fromAddress: Sender address
- status: Transaction status
- network: Network used
- metadata: Additional transaction data
- createdAt: Transaction timestamp
- confirmedAt: Confirmation timestamp
```

### Signed Messages Table
```sql
- id: Primary key
- userId: Foreign key to users
- sessionId: Foreign key to sessions (optional)
- message: Original message
- signature: Cryptographic signature
- messageHash: Message hash
- createdAt: Signing timestamp
```

## 🛠️ Development

### Running Locally
```bash
# Install dependencies
npm install

# Build the snap
npm run build

# Start development server
npm run dev

# Start production server
npm start
```

### Development Workflows
- **Build**: `npx webpack --mode production`
- **Development**: `npx webpack --mode development --watch`
- **Server**: `node server.js`
- **HTTP Server**: `python3 -m http.server 5000`

### File Structure
```
├── src/                     # Source code
│   ├── index.ts            # Main snap entry point
│   ├── tron.ts             # TRON service layer
│   ├── dapp-connector.ts   # dApp integration
│   ├── database.ts         # Database service
│   ├── types.ts            # TypeScript definitions
│   └── utils.ts            # Utility functions
├── dist/                    # Built snap bundle
├── images/                  # Snap icon and assets
├── server.js               # Express development server
├── snap.manifest.json      # Snap configuration
├── webpack.config.js       # Build configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts
```

## 🎯 Usage Examples

### Basic TRON Operations
```javascript
// Connect to TRON
const account = await window.ethereum.request({
  method: 'wallet_invokeSnap',
  params: {
    snapId: 'local:http://localhost:5000',
    request: { method: 'tron_connect' }
  }
});

// Check balance
const balance = await window.ethereum.request({
  method: 'wallet_invokeSnap',
  params: {
    snapId: 'local:http://localhost:5000',
    request: { method: 'tron_getBalance' }
  }
});

// Send transaction
const txHash = await window.ethereum.request({
  method: 'wallet_invokeSnap',
  params: {
    snapId: 'local:http://localhost:5000',
    request: {
      method: 'tron_sendTransaction',
      params: {
        to: 'TRX_ADDRESS',
        amount: '1000000', // 1 TRX in SUN
        memo: 'Payment'
      }
    }
  }
});
```

### dApp Integration
```javascript
// Connect dApp
const session = await window.ethereum.request({
  method: 'wallet_invokeSnap',
  params: {
    snapId: 'local:http://localhost:5000',
    request: {
      method: 'tron_dapp_connect',
      params: {
        origin: 'https://example-dapp.com',
        name: 'Example dApp',
        icon: 'https://example-dapp.com/icon.png'
      }
    }
  }
});

// Use global tron object (TronLink compatibility)
if (window.tron) {
  const accounts = await window.tron.request({
    method: 'tron_requestAccounts'
  });
}
```

## 🔧 Configuration

### Snap Manifest
The `snap.manifest.json` file defines:
- Snap metadata and description
- Required permissions
- Icon and branding
- Version information

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string (auto-configured in Replit)
- `TRON_PRO_API_KEY`: Optional TRON API key for enhanced rate limits

## 🚀 Deployment

### Replit Deployment
1. Ensure all build processes complete successfully
2. Verify the server runs on port 5000
3. Use run command: `node server.js`
4. Deploy using Replit's deployment system

### Production Considerations
- Set up proper TRON API keys for rate limiting
- Configure database connection pooling
- Enable HTTPS for secure connections
- Monitor transaction success rates
- Implement proper error logging

## 🤝 Contributing

### Development Guidelines
- Follow TypeScript strict mode
- Use ESLint for code quality
- Write comprehensive error handling
- Add user approval for all operations
- Maintain backward compatibility

### Testing
- Test on both mainnet and testnet
- Verify dApp compatibility
- Check database operations
- Validate security measures
- Test error scenarios

## 📄 License

This project is licensed under the ISC License.

## 🔗 Links

- [TRON Official Website](https://tron.network/)
- [MetaMask Snaps Documentation](https://docs.metamask.io/guide/snaps.html)
- [TronGrid API Documentation](https://developers.tron.network/docs)
- [TRON Blockchain Explorer](https://tronscan.org/)

---

**Built with ❤️ for the TRON ecosystem**
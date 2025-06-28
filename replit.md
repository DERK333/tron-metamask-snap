# TRON Snap for MetaMask

## Overview

This project is a MetaMask Snap that provides TRON blockchain integration capabilities. It allows users to manage TRON accounts, send transactions, sign messages, and interact with the TRON network directly through MetaMask. The snap is built using TypeScript and the MetaMask Snaps framework, providing a secure and seamless way to access TRON functionality within the MetaMask ecosystem.

## System Architecture

The application follows a modular architecture designed specifically for MetaMask Snaps with dApp connectivity:

### Core Architecture Components
- **Snap Entry Point**: `src/index.ts` - Main RPC request handler that routes incoming requests
- **TRON Service Layer**: `src/tron.ts` - Core blockchain interaction logic and account management
- **dApp Connector**: `src/dapp-connector.ts` - TronLink-style dApp connection and session management
- **Utility Functions**: `src/utils.ts` - Helper functions for address validation, formatting, and data manipulation
- **Type Definitions**: `src/types.ts` - TypeScript interfaces for type safety

### Build System
- **Webpack Configuration**: Bundles TypeScript code into a single JavaScript file for snap deployment
- **TypeScript Compilation**: Strict type checking with ES2020 target
- **ESLint Configuration**: Code quality and style enforcement

## Key Components

### 1. RPC Request Handler
- Handles incoming requests from dApps and MetaMask UI
- Supports methods: `tron_connect`, `tron_getAccount`, `tron_getBalance`, `tron_sendTransaction`, `tron_signMessage`, `tron_getTransactionHistory`, `tron_switchNetwork`, `tron_dapp_connect`, `tron_dapp_sessions`, `tron_dapp_disconnect`, `tron_stake`, `tron_unstake`, `tron_vote`, `tron_getStakingInfo`, `tron_getSuperRepresentatives`, `tron_withdrawExpiredUnfrozen`
- Implements error handling and user notifications

### 2. TRON Service
- Manages TRON network connections (mainnet/testnet)
- Handles account derivation using BIP44 and MetaMask's key tree
- Integrates with TRON API endpoints for blockchain operations
- Manages network switching between mainnet and testnet

### 3. dApp Connection System
- TronLink-compatible dApp connection management
- Session tracking and approval workflows
- Global tron object implementation for dApp compatibility
- Secure origin-based session management

### 4. Account Management
- Derives TRON accounts from MetaMask's entropy
- Securely stores private keys using MetaMask's state management
- Supports both mainnet and testnet addresses

### 5. Transaction Processing
- Handles TRX transfers with proper formatting
- Implements transaction signing using TRON cryptographic standards
- Provides transaction history retrieval and formatting
- dApp-initiated transaction approval and execution

## Data Flow

1. **Connection Flow**: dApp → MetaMask → Snap → TRON Service → Account Derivation
2. **Transaction Flow**: User Input → Snap Validation → TRON Network → Confirmation → State Update
3. **Balance Queries**: Snap → TRON API → Balance Formatting → Return to dApp
4. **Network Operations**: All operations route through the TronService class for consistent network handling

## External Dependencies

### MetaMask Snap Framework
- `@metamask/snaps-types`: Type definitions for snap development
- `@metamask/snaps-ui`: UI components for snap dialogs and notifications
- `@metamask/key-tree`: Cryptographic key derivation utilities

### TRON Network Integration
- TRON API endpoints (TronGrid):
  - Mainnet: `https://api.trongrid.io`
  - Testnet: `https://api.shasta.trongrid.io`
- TRON-PRO-API-KEY for enhanced API access (optional)

### Development Tools
- TypeScript for type safety and modern JavaScript features
- Webpack for bundling and optimization
- ESLint for code quality assurance

## Deployment Strategy

### Build Process
1. TypeScript compilation with strict type checking
2. Webpack bundling into single `dist/bundle.js` file
3. Code optimization and minification for production

### Snap Manifest
- Defined in `snap.manifest.json` with required permissions
- Permissions include: dialog display, state management, notifications, network access, and RPC handling
- Targets npm registry distribution

### Network Configuration
- Supports both TRON mainnet and testnet
- API key configuration for enhanced rate limits
- Fallback mechanisms for network connectivity issues

## Changelog

```
Changelog:
- June 26, 2025. Initial setup and complete implementation
  - Created complete TRON snap with TypeScript
  - Implemented account creation, balance checking, transactions
  - Added message signing and network switching functionality
  - Built and deployed snap successfully with development server

- June 26, 2025. dApp Connection Integration
  - Integrated TronLink-style dApp connection functionality
  - Created custom dApp connector following TronLink's approach
  - Added dApp session management and approval dialogs
  - Implemented global tron object for dApp compatibility
  - Created comprehensive demo page showing dApp integration
  - Successfully built enhanced snap with dApp connection support

- June 26, 2025. Replit Auth and NPM Publication Setup
  - Integrated Replit Auth with PostgreSQL database backend
  - Created React frontend with authentication system
  - Added user management with database storage
  - Prepared package for NPM publication with proper manifest
  - Generated package hash and created publication documentation
  - Set up complete web application with landing and dashboard pages

- June 27, 2025. Package Updates
  - Published to npm as "tron-metamask-snap" v1.0.0
  - Updated to v1.0.1 with GitHub attribution (username: Derk333)
  - Updated to v1.0.2 with support email: damailman@dmail.ai

- June 28, 2025. GitHub Repository Push
  - Successfully pushed complete TRON Snap codebase to GitHub
  - Repository URL: https://github.com/DERK333/tron-metamask-snap
  - Includes full source code, build configuration, and documentation
  - Ready for community contributions and collaboration

- June 28, 2025. Interactive Transaction Preview Feature
  - Implemented comprehensive transaction preview system
  - Added real-time network status monitoring (congestion, block height)
  - Integrated automatic risk assessment with warnings for high-risk transactions
  - Built transaction simulation to predict success/failure before execution
  - Added smart contract detection and interaction details
  - Enhanced fee estimation with energy and bandwidth calculations
  - Created unified transaction summary view
  - Successfully compiled and integrated into both direct snap usage and dApp connector

- June 28, 2025. Staking and Voting Features
  - Added complete TRX staking functionality for energy and bandwidth resources
  - Implemented unstaking with 14-day withdrawal period
  - Built voting system for Super Representatives (SRs)
  - Added methods to get staking information and SR list
  - Created withdrawal function for expired unfrozen balance
  - Integrated voting power calculation (1 TRX = 1 vote)
  - Built comprehensive demo page showcasing staking and voting
  - Successfully compiled snap bundle (35.6 KiB)

- June 28, 2025. Published Version 1.0.3
  - Successfully published to npm registry
  - Fixed manifest shasum mismatch issue
  - Package available at: https://www.npmjs.com/package/tron-metamask-snap
  - GitHub repository force-pushed with latest updates
  - All staking and voting features included in release
  - Package size: 11.6 kB (unpacked: 41.2 kB)
  - Features: staking, voting, transaction preview, dApp connectivity
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```
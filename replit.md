# TRON Snap for MetaMask

## Overview

This project is a MetaMask Snap that provides TRON blockchain integration capabilities. It allows users to manage TRON accounts, send transactions, sign messages, and interact with the TRON network directly through MetaMask. The snap is built using TypeScript and the MetaMask Snaps framework, providing a secure and seamless way to access TRON functionality within the MetaMask ecosystem.

## System Architecture

The application follows a modular architecture designed specifically for MetaMask Snaps:

### Core Architecture Components
- **Snap Entry Point**: `src/index.ts` - Main RPC request handler that routes incoming requests
- **TRON Service Layer**: `src/tron.ts` - Core blockchain interaction logic and account management
- **Utility Functions**: `src/utils.ts` - Helper functions for address validation, formatting, and data manipulation
- **Type Definitions**: `src/types.ts` - TypeScript interfaces for type safety

### Build System
- **Webpack Configuration**: Bundles TypeScript code into a single JavaScript file for snap deployment
- **TypeScript Compilation**: Strict type checking with ES2020 target
- **ESLint Configuration**: Code quality and style enforcement

## Key Components

### 1. RPC Request Handler
- Handles incoming requests from dApps and MetaMask UI
- Supports methods: `tron_connect`, `tron_getAccount`, `tron_getBalance`, `tron_sendTransaction`, `tron_signMessage`, `tron_getTransactionHistory`, `tron_switchNetwork`
- Implements error handling and user notifications

### 2. TRON Service
- Manages TRON network connections (mainnet/testnet)
- Handles account derivation using BIP44 and MetaMask's key tree
- Integrates with TRON API endpoints for blockchain operations
- Manages network switching between mainnet and testnet

### 3. Account Management
- Derives TRON accounts from MetaMask's entropy
- Securely stores private keys using MetaMask's state management
- Supports both mainnet and testnet addresses

### 4. Transaction Processing
- Handles TRX transfers with proper formatting
- Implements transaction signing using TRON cryptographic standards
- Provides transaction history retrieval and formatting

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
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```
# Stellar Wallets Kit Integration

## Overview

The application now uses **Stellar Wallets Kit** for multi-wallet support instead of just Freighter. This allows users to connect with multiple wallet options.

## Supported Wallets

The Stellar Wallets Kit supports the following wallets out of the box:

- **xBull Wallet** (PWA & extension)
- **Albedo**
- **Freighter**
- **Rabet** (extension)
- **WalletConnect**
- **Lobstr**
- **Hana**
- **Hot Wallet**
- **Klever Wallet**
- **Ledger Hardware Wallet**
- **Trezor Hardware Wallet**

## Installation

The required dependencies have been added to `package.json`:

```bash
pnpm install
```

This installs:

- `@creit-tech/stellar-wallets-kit` - Multi-wallet support library
- `@stellar/stellar-sdk` - Stellar SDK for transaction handling

## Implementation Details

### Files Modified/Created

1. **`frontend/lib/stellar-wallets-kit.ts`** - Initialization utility
   - Initializes the Stellar Wallets Kit with dark theme
   - Loads default wallet modules
   - Prevents duplicate initialization

2. **`frontend/components/auth/WalletConnectButton.tsx`** - Updated component
   - Now uses Stellar Wallets Kit instead of Freighter-only
   - Renders a wallet selection modal
   - Handles multi-wallet authentication flow
   - Maintains existing authentication logic

3. **`frontend/package.json`** - Updated dependencies
   - Added `@creit-tech/stellar-wallets-kit`
   - Added `@stellar/stellar-sdk`

### How It Works

1. **Initialization**: When the component mounts, it initializes the Stellar Wallets Kit
2. **Button Creation**: The kit creates a button that opens a wallet selection modal
3. **Wallet Selection**: Users select their preferred wallet from the modal
4. **Authentication**: The selected wallet signs the authentication challenge
5. **Verification**: The signature is verified on the backend
6. **Session**: User is logged in with tokens stored in auth store

## Usage

The `WalletConnectButton` component is used in:

- Login page (`frontend/app/login/page.tsx`)
- Navbar (`frontend/components/Navbar.tsx`)

### Basic Usage

```tsx
import WalletConnectButton from '@/components/auth/WalletConnectButton';

export default function MyComponent() {
  return (
    <WalletConnectButton
      className="w-full"
      buttonText="Connect Wallet"
      onSuccess={() => console.log('Connected!')}
    />
  );
}
```

### Props

- `className?: string` - CSS classes for the wrapper div
- `buttonText?: string` - Text displayed on the button (default: "Connect Wallet")
- `onSuccess?: () => void` - Callback function when authentication succeeds

## Network Configuration

The kit is configured to use the **PUBLIC** Stellar network by default. To change networks, modify `frontend/lib/stellar-wallets-kit.ts`:

```typescript
// For testnet
networkPassphrase: StellarSdk.Networks.TESTNET;

// For public
networkPassphrase: StellarSdk.Networks.PUBLIC;
```

## Error Handling

The component handles various error scenarios:

- User cancels wallet connection
- User rejects transaction signing
- Network errors
- Invalid authentication response

All errors are displayed as toast notifications to the user.

## Troubleshooting

### Button Not Appearing

1. Ensure `pnpm install` has been run
2. Check browser console for initialization errors
3. Verify the component is mounted in the DOM

### Wallet Not Connecting

1. Ensure the wallet extension is installed and enabled
2. Check that the wallet is on the correct network
3. Review browser console for specific error messages

### Authentication Failing

1. Verify the backend `/api/auth/stellar/challenge` endpoint is working
2. Check that `/api/auth/stellar/verify` endpoint is accessible
3. Ensure wallet address is correctly passed to the backend

## References

- [Stellar Wallets Kit Documentation](https://stellarwalletskit.dev/)
- [Stellar Developers - Wallet Integration](https://developers.stellar.org/docs/tools/developer-tools/wallets)
- [Stellar SDK Documentation](https://developers.stellar.org/docs/build/guides/stellar-sdk)

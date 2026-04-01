'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/store/authStore';
import {
  initializeStellarWalletsKit,
  StellarWalletsKit,
} from '@/lib/stellar-wallets-kit';
import toast from 'react-hot-toast';
import { requestChallenge, verifySignature } from '@/lib/stellar-auth';
import * as StellarSdk from '@stellar/stellar-sdk';

interface WalletConnectButtonProps {
  onSuccess?: () => void;
  className?: string;
  buttonText?: string;
}

export default function WalletConnectButton({
  onSuccess,
  className = '',
  buttonText = 'Connect Wallet',
}: WalletConnectButtonProps) {
  const buttonWrapperRef = useRef<HTMLDivElement>(null);
  const { setTokens, setWalletAddress } = useAuth();
  const isInitializedRef = useRef(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure component only renders on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !buttonWrapperRef.current || isInitializedRef.current)
      return;

    try {
      initializeStellarWalletsKit();

      // Create the wallet kit button
      StellarWalletsKit.createButton(buttonWrapperRef.current);
      isInitializedRef.current = true;

      // Override the button click handler to add our authentication logic
      const handleWalletConnect = async () => {
        if (isConnecting) return;
        setIsConnecting(true);

        try {
          const { address } = await StellarWalletsKit.getAddress();

          if (!address) {
            throw new Error('Failed to get wallet address');
          }

          // Get Challenge
          toast.loading('Getting authentication challenge...', {
            id: 'wallet-challenge',
          });
          const challengeXdr = await requestChallenge(address);
          toast.dismiss('wallet-challenge');

          // Sign Challenge
          toast.loading('Please sign the transaction in your wallet...', {
            id: 'wallet-sign',
          });

          const { signedTxXdr } = await StellarWalletsKit.signTransaction(
            challengeXdr,
            {
              networkPassphrase: StellarSdk.Networks.PUBLIC,
              address,
            },
          );
          toast.dismiss('wallet-sign');

          // Verify Signature
          toast.loading('Verifying authentication...', { id: 'wallet-verify' });
          const result = await verifySignature(
            address,
            challengeXdr,
            signedTxXdr,
          );
          toast.dismiss('wallet-verify');

          // Manage session state
          if (result.accessToken && result.refreshToken && result.user) {
            setTokens(result.accessToken, result.refreshToken, result.user);
            setWalletAddress(address);
            toast.success('Successfully logged in with Wallet!');
            if (onSuccess) {
              onSuccess();
            }
          } else {
            throw new Error('Invalid authentication response');
          }
        } catch (error: unknown) {
          toast.dismiss('wallet-challenge');
          toast.dismiss('wallet-sign');
          toast.dismiss('wallet-verify');
          const errorMessage =
            error instanceof Error ? error.message : String(error);
          if (
            !errorMessage.toLowerCase().includes('cancelled') &&
            !errorMessage.toLowerCase().includes('reject') &&
            !errorMessage.toLowerCase().includes('user denied')
          ) {
            toast.error(errorMessage || 'Wallet connection failed');
          }
          console.error('Wallet connect error:', error);
        } finally {
          setIsConnecting(false);
        }
      };

      // Find and override the button's click handler
      const observer = new MutationObserver(() => {
        const button = buttonWrapperRef.current?.querySelector('button');
        if (button && !button.dataset.customHandler) {
          button.dataset.customHandler = 'true';
          button.addEventListener('click', (e) => {
            e.preventDefault();
            handleWalletConnect();
          });
        }
      });

      observer.observe(buttonWrapperRef.current, {
        childList: true,
        subtree: true,
      });

      return () => {
        observer.disconnect();
      };
    } catch (error) {
      console.error('Failed to initialize wallet button:', error);
      toast.error('Failed to initialize wallet connection');
    }
  }, [setTokens, setWalletAddress, onSuccess, isConnecting, isMounted]);

  // Don't render anything until mounted on client
  if (!isMounted) {
    return <div className={className} />;
  }

  return (
    <div
      ref={buttonWrapperRef}
      className={className}
      suppressHydrationWarning
    />
  );
}

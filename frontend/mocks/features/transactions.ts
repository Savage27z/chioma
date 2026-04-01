/**
 * Mock Transaction Data
 */

export type TransactionType = 'Rent' | 'Deposit' | 'Refund' | 'Service Fee';
export type TransactionStatus = 'Pending' | 'Completed' | 'Failed';

export interface Transaction {
  id: string;
  date: string;
  type: TransactionType;
  amount: number;
  currency: string;
  amountUsd?: number;
  status: TransactionStatus;
  propertyId: string;
  propertyName: string;
  txHash: string | null;
  description?: string;
  isSecurityDeposit?: boolean;
  securityDepositId?: string;
}

export interface DashboardPayment {
  id: string;
  agreementId: string;
  agreementReference: string;
  propertyName: string;
  counterpartyName: string;
  amount: number;
  currency: string;
  paymentDate: string;
  paymentMethod: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED' | 'REFUNDED';
  referenceNumber: string;
  notes: string;
  direction: 'incoming' | 'outgoing';
}

export interface StellarTransaction {
  id: string;
  hash: string;
  type: 'payment' | 'create_account' | 'change_trust' | 'manage_offer';
  amount: string;
  assetCode: string;
  from: string;
  to?: string;
  status: 'completed' | 'pending' | 'failed';
  createdAt: string;
  fee: string;
  memo?: string;
}

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1',
    date: '2025-02-20T14:32:00Z',
    type: 'Rent',
    amount: 2400,
    currency: 'XLM',
    amountUsd: 480,
    status: 'Completed',
    propertyId: 'prop-1',
    propertyName: 'Sunset View Apartments',
    txHash: 'a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456',
    description: 'February 2025 rent',
  },
  {
    id: 'tx-2',
    date: '2025-02-18T09:15:00Z',
    type: 'Deposit',
    amount: 4800,
    currency: 'XLM',
    amountUsd: 960,
    status: 'Completed',
    propertyId: 'prop-1',
    propertyName: 'Sunset View Apartments',
    txHash: 'b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef12345678',
    description: 'Security deposit',
    isSecurityDeposit: true,
    securityDepositId: 'sd-1',
  },
  {
    id: 'tx-3',
    date: '2025-02-15T11:00:00Z',
    type: 'Service Fee',
    amount: 24,
    currency: 'USD',
    status: 'Completed',
    propertyId: 'prop-1',
    propertyName: 'Sunset View Apartments',
    txHash: null,
    description: 'Platform fee (1%)',
  },
  {
    id: 'tx-4',
    date: '2025-02-12T16:45:00Z',
    type: 'Rent',
    amount: 8000,
    currency: 'XLM',
    amountUsd: 1600,
    status: 'Completed',
    propertyId: 'prop-2',
    propertyName: 'Downtown Retail Space',
    txHash: 'c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567890',
    description: 'February 2025 rent',
  },
  {
    id: 'tx-5',
    date: '2025-02-10T08:30:00Z',
    type: 'Refund',
    amount: 960,
    currency: 'USD',
    status: 'Completed',
    propertyId: 'prop-3',
    propertyName: 'Pine Tree Townhouse',
    txHash: 'd4e5f6789012345678901234567890abcdef1234567890abcdef123456789012',
    description: 'Security deposit refund',
    isSecurityDeposit: true,
    securityDepositId: 'sd-2',
  },
  {
    id: 'tx-6',
    date: '2025-02-08T13:20:00Z',
    type: 'Rent',
    amount: 2200,
    currency: 'XLM',
    amountUsd: 440,
    status: 'Pending',
    propertyId: 'prop-3',
    propertyName: 'Pine Tree Townhouse',
    txHash: null,
    description: 'March 2025 rent (scheduled)',
  },
  {
    id: 'tx-7',
    date: '2025-02-05T10:00:00Z',
    type: 'Deposit',
    amount: 4400,
    currency: 'XLM',
    amountUsd: 880,
    status: 'Completed',
    propertyId: 'prop-3',
    propertyName: 'Pine Tree Townhouse',
    txHash: 'e5f6789012345678901234567890abcdef1234567890abcdef12345678901234',
    description: 'Security deposit',
    isSecurityDeposit: true,
    securityDepositId: 'sd-2',
  },
  {
    id: 'tx-8',
    date: '2025-02-01T00:05:00Z',
    type: 'Rent',
    amount: 1500,
    currency: 'USD',
    status: 'Failed',
    propertyId: 'prop-4',
    propertyName: 'Riverside Studio',
    txHash: null,
    description: 'February 2025 rent - insufficient funds',
  },
  {
    id: 'tx-9',
    date: '2025-01-28T14:00:00Z',
    type: 'Service Fee',
    amount: 80,
    currency: 'USD',
    status: 'Completed',
    propertyId: 'prop-2',
    propertyName: 'Downtown Retail Space',
    txHash: null,
    description: 'Platform fee (1%)',
  },
  {
    id: 'tx-10',
    date: '2025-01-25T09:30:00Z',
    type: 'Deposit',
    amount: 3200,
    currency: 'XLM',
    amountUsd: 640,
    status: 'Completed',
    propertyId: 'prop-4',
    propertyName: 'Riverside Studio',
    txHash: 'f6789012345678901234567890abcdef1234567890abcdef1234567890123456',
    description: 'Security deposit',
    isSecurityDeposit: true,
    securityDepositId: 'sd-3',
  },
];

export const MOCK_DASHBOARD_PAYMENTS: DashboardPayment[] = [
  {
    id: 'pay-001',
    agreementId: 'agr-tenant-001',
    agreementReference: 'AGR-2025-014',
    propertyName: 'Sunset Apartments, Unit 4B',
    counterpartyName: 'James Adebayo',
    amount: 150000,
    currency: 'USDC',
    paymentDate: '2026-03-01T09:15:00.000Z',
    paymentMethod: 'Stellar Transfer',
    status: 'COMPLETED',
    referenceNumber: 'GABC3F9K7X1A',
    notes: 'March rent payment',
    direction: 'outgoing',
  },
  {
    id: 'pay-002',
    agreementId: 'agr-tenant-001',
    agreementReference: 'AGR-2025-014',
    propertyName: 'Sunset Apartments, Unit 4B',
    counterpartyName: 'James Adebayo',
    amount: 150000,
    currency: 'USDC',
    paymentDate: '2026-02-01T09:12:00.000Z',
    paymentMethod: 'Stellar Transfer',
    status: 'COMPLETED',
    referenceNumber: 'GDFE2L8M3Q9Z',
    notes: 'February rent payment',
    direction: 'outgoing',
  },
  {
    id: 'pay-003',
    agreementId: 'agr-tenant-001',
    agreementReference: 'AGR-2025-014',
    propertyName: 'Sunset Apartments, Unit 4B',
    counterpartyName: 'James Adebayo',
    amount: 25000,
    currency: 'USDC',
    paymentDate: '2026-01-28T11:45:00.000Z',
    paymentMethod: 'Refund',
    status: 'REFUNDED',
    referenceNumber: 'GLMN5R7T8C4D',
    notes: 'Utility overcharge refund',
    direction: 'incoming',
  },
];

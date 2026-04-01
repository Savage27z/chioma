/**
 * Mock Agent Analytics Data\n */

export interface AgentMetrics {
  totalCommissions: string;
  profileViews: string;
  inquiries: string;
  closedContracts: string;
  conversionRate: string;
  averageResponseTime: string;
}

export interface WalletBalance {
  currency: string;
  balance: number;
  usdValue: number;
}

export const MOCK_AGENT_METRICS: AgentMetrics = {
  totalCommissions: '$56,450',
  profileViews: '1,240',
  inquiries: '430',
  closedContracts: '34',
  conversionRate: '7.9%',
  averageResponseTime: '2.3 hours',
};

export const MOCK_WALLET_BALANCES: WalletBalance[] = [
  {
    currency: 'USDC',
    balance: 12450.0,
    usdValue: 12450.0,
  },
  {
    currency: 'NGN',
    balance: 102450.0,
    usdValue: 250.0,
  },
];

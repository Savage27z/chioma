/**
 * Mock Currency Data
 */

export interface Currency {
  id: string;
  code: string;
  name: string;
  symbol: string;
  decimalPlaces: number;
  status: 'active' | 'inactive';
  anchorUrl: string;
  stellarAssetCode: string;
  stellarAssetIssuer: string;
  lastUpdated: string;
}

export const MOCK_CURRENCIES: Currency[] = [
  {
    id: '1',
    code: 'USDC',
    name: 'USD Coin',
    symbol: '$',
    decimalPlaces: 7,
    status: 'active',
    anchorUrl: 'center.io',
    stellarAssetCode: 'USDC',
    stellarAssetIssuer:
      'GA5ZSEJYB37JRC5AVCIAZDL2Y343STVCUCGAXWVG2NC7AL6H6HKEF7G2',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: '2',
    code: 'NGN',
    name: 'Nigerian Naira',
    symbol: '₦',
    decimalPlaces: 2,
    status: 'active',
    anchorUrl: 'cowrie.exchange',
    stellarAssetCode: 'NGN',
    stellarAssetIssuer:
      'GA5ZSEJYB37JRC5AVCIAZDL2Y343STVCUCGAXWVG2NC7AL6H6HKEF7G2',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: '3',
    code: 'ZAR',
    name: 'South African Rand',
    symbol: 'R',
    decimalPlaces: 2,
    status: 'inactive',
    anchorUrl: 'payouts.money',
    stellarAssetCode: 'ZAR',
    stellarAssetIssuer:
      'GC5R5Y5X5Z5W5V5U5T5S5R5Q5P5O5N5M5L5K5J5I5H5G5F5E5D5C5B5A',
    lastUpdated: new Date().toISOString(),
  },
];

/**
 * Mock Agreement/Lease Data
 */

export interface Agreement {
  id: string;
  reference: string;
  propertyId: string;
  landlordId: string;
  tenantId: string;
  agentId?: string;
  rentAmount: number;
  currency: string;
  securityDeposit: number;
  startDate: string;
  endDate: string;
  status: 'ACTIVE' | 'PENDING' | 'EXPIRED' | 'TERMINATED';
  stage: 'DRAFT' | 'SIGNED' | 'DEPOSIT_LOCKED' | 'ACTIVE' | 'COMPLETED';
}

export const MOCK_AGREEMENTS: Agreement[] = [
  {
    id: 'agr-001',
    reference: 'AGR-2025-014',
    propertyId: 'prop-001',
    landlordId: 'landlord-001',
    tenantId: 'tenant-001',
    agentId: 'agent-001',
    rentAmount: 150000,
    currency: 'USDC',
    securityDeposit: 300000,
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    status: 'ACTIVE',
    stage: 'ACTIVE',
  },
  {
    id: 'agr-002',
    reference: 'AGR-2025-021',
    propertyId: 'prop-002',
    landlordId: 'landlord-002',
    tenantId: 'tenant-002',
    agentId: 'agent-001',
    rentAmount: 200000,
    currency: 'USDC',
    securityDeposit: 400000,
    startDate: '2025-02-01',
    endDate: '2026-01-31',
    status: 'ACTIVE',
    stage: 'ACTIVE',
  },
  {
    id: 'agr-003',
    reference: 'AGR-2025-010',
    propertyId: 'prop-003',
    landlordId: 'landlord-001',
    tenantId: 'tenant-003',
    agentId: 'agent-002',
    rentAmount: 180000,
    currency: 'USDC',
    securityDeposit: 360000,
    startDate: '2025-03-01',
    endDate: '2026-02-28',
    status: 'ACTIVE',
    stage: 'ACTIVE',
  },
];

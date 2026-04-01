/**
 * Mock Property Data
 */

export interface Property {
  id: string;
  name: string;
  address: string;
  unit?: string;
  city: string;
  country: string;
  landlordId: string;
  status: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE';
}

export const MOCK_PROPERTIES: Property[] = [
  {
    id: 'prop-001',
    name: 'Sunset Apartments',
    address: '12 Victoria Island Rd',
    unit: 'Unit 4B',
    city: 'Lagos',
    country: 'Nigeria',
    landlordId: 'landlord-001',
    status: 'ACTIVE',
  },
  {
    id: 'prop-002',
    name: 'Glover Road, Ikoyi',
    address: 'Glover Road',
    unit: 'Suite A',
    city: 'Lagos',
    country: 'Nigeria',
    landlordId: 'landlord-002',
    status: 'ACTIVE',
  },
  {
    id: 'prop-003',
    name: 'Admiralty Way, Block 4',
    address: 'Block 4, Admiralty Way',
    unit: 'Floor 2',
    city: 'Lagos',
    country: 'Nigeria',
    landlordId: 'landlord-001',
    status: 'ACTIVE',
  },
  {
    id: 'prop-004',
    name: 'Downtown Retail Space',
    address: '45 Commercial Ave',
    city: 'Lagos',
    country: 'Nigeria',
    landlordId: 'landlord-002',
    status: 'ACTIVE',
  },
  {
    id: 'prop-005',
    name: 'Pine Tree Townhouse',
    address: '78 Residential Lane',
    city: 'Lagos',
    country: 'Nigeria',
    landlordId: 'landlord-001',
    status: 'ACTIVE',
  },
];

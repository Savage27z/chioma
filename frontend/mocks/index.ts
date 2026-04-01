/**
 * Mock Data Central Hub
 * Centralized export point for all mock data across the application
 */

// Core entities
export * from './entities/users';
export * from './entities/properties';
export * from './entities/agreements';
export * from './entities/tenants';
export * from './entities/currencies';

// Features
export * from './features/disputes';
export * from './features/reviews';
export * from './features/transactions';
export * from './features/maintenance';
export * from './features/documents';
export * from './features/refunds';
export * from './features/referrals';
export * from './features/contracts';

// Analytics & Metrics
export * from './analytics/dashboard';
export * from './analytics/auth-metrics';
export * from './analytics/agent-analytics';

// API Layer
export { getMockData, shouldUseMockApi } from './api/mock-api';

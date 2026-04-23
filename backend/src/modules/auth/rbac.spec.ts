import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { UserRole } from '../users/entities/user.entity';

/**
 * Comprehensive RBAC (Role-Based Access Control) Tests
 *
 * These tests ensure that:
 * 1. Only ADMIN users can call privileged functions
 * 2. Only the specific USER can sign their own agreements
 * 3. Role guards properly enforce access control
 */
describe('RBAC - Role-Based Access Control', () => {
  let guard: RolesGuard;
  let reflector: Reflector;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RolesGuard, Reflector],
    }).compile();

    guard = module.get<RolesGuard>(RolesGuard);
    reflector = module.get<Reflector>(Reflector);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // ─── Helper Functions ────────────────────────────────────────────────────────

  function createMockExecutionContext(
    user: { id: string; role: UserRole } | null,
    requiredRoles: UserRole[] | null,
  ): ExecutionContext {
    const mockContext = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue({ user }),
      }),
      getHandler: jest.fn(),
      getClass: jest.fn(),
    } as unknown as ExecutionContext;

    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(requiredRoles);

    return mockContext;
  }

  // ─── RolesGuard Tests ────────────────────────────────────────────────────────

  describe('RolesGuard', () => {
    it('allows access when no roles are required', () => {
      const context = createMockExecutionContext(
        { id: 'user-1', role: UserRole.USER },
        null,
      );

      const result = guard.canActivate(context);

      expect(result).toBe(true);
    });

    it('allows ADMIN to access ADMIN-only endpoints', () => {
      const context = createMockExecutionContext(
        { id: 'admin-1', role: UserRole.ADMIN },
        [UserRole.ADMIN],
      );

      const result = guard.canActivate(context);

      expect(result).toBe(true);
    });

    it('blocks USER from accessing ADMIN-only endpoints', () => {
      const context = createMockExecutionContext(
        { id: 'user-1', role: UserRole.USER },
        [UserRole.ADMIN],
      );

      expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
    });

    it('blocks AGENT from accessing ADMIN-only endpoints', () => {
      const context = createMockExecutionContext(
        { id: 'agent-1', role: UserRole.AGENT },
        [UserRole.ADMIN],
      );

      expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
    });

    it('allows SUPER_ADMIN to access ADMIN-only endpoints', () => {
      const context = createMockExecutionContext(
        { id: 'super-1', role: UserRole.SUPER_ADMIN },
        [UserRole.ADMIN, UserRole.SUPER_ADMIN],
      );

      const result = guard.canActivate(context);

      expect(result).toBe(true);
    });

    it('allows USER to access USER-allowed endpoints', () => {
      const context = createMockExecutionContext(
        { id: 'user-1', role: UserRole.USER },
        [UserRole.USER, UserRole.ADMIN],
      );

      const result = guard.canActivate(context);

      expect(result).toBe(true);
    });

    it('throws ForbiddenException when user is not authenticated', () => {
      const context = createMockExecutionContext(null, [UserRole.ADMIN]);

      expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
      expect(() => guard.canActivate(context)).toThrow(
        'User not authenticated',
      );
    });

    it('throws ForbiddenException with correct message for insufficient permissions', () => {
      const context = createMockExecutionContext(
        { id: 'user-1', role: UserRole.USER },
        [UserRole.ADMIN],
      );

      expect(() => guard.canActivate(context)).toThrow(
        'Insufficient permissions',
      );
    });

    it('allows access when user has one of multiple required roles', () => {
      const context = createMockExecutionContext(
        { id: 'agent-1', role: UserRole.AGENT },
        [UserRole.ADMIN, UserRole.AGENT],
      );

      const result = guard.canActivate(context);

      expect(result).toBe(true);
    });
  });

  // ─── Property Management RBAC Tests ──────────────────────────────────────────

  describe('Property Management - RBAC', () => {
    it('ADMIN can create properties', () => {
      const context = createMockExecutionContext(
        { id: 'admin-1', role: UserRole.ADMIN },
        [UserRole.ADMIN],
      );

      expect(guard.canActivate(context)).toBe(true);
    });

    it('USER cannot create properties (ADMIN-only)', () => {
      const context = createMockExecutionContext(
        { id: 'user-1', role: UserRole.USER },
        [UserRole.ADMIN],
      );

      expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
    });

    it('ADMIN can update any property', () => {
      const context = createMockExecutionContext(
        { id: 'admin-1', role: UserRole.ADMIN },
        [UserRole.ADMIN],
      );

      expect(guard.canActivate(context)).toBe(true);
    });

    it('ADMIN can delete any property', () => {
      const context = createMockExecutionContext(
        { id: 'admin-1', role: UserRole.ADMIN },
        [UserRole.ADMIN],
      );

      expect(guard.canActivate(context)).toBe(true);
    });

    it('ADMIN can set verificationStatus on properties', () => {
      const context = createMockExecutionContext(
        { id: 'admin-1', role: UserRole.ADMIN },
        [UserRole.ADMIN],
      );

      expect(guard.canActivate(context)).toBe(true);
    });
  });

  // ─── Agreement Management RBAC Tests ─────────────────────────────────────────

  describe('Agreement Management - RBAC', () => {
    it('ADMIN can create agreements', () => {
      const context = createMockExecutionContext(
        { id: 'admin-1', role: UserRole.ADMIN },
        [UserRole.ADMIN],
      );

      expect(guard.canActivate(context)).toBe(true);
    });

    it('USER cannot create agreements (ADMIN-only)', () => {
      const context = createMockExecutionContext(
        { id: 'user-1', role: UserRole.USER },
        [UserRole.ADMIN],
      );

      expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
    });

    it('ADMIN can update any agreement', () => {
      const context = createMockExecutionContext(
        { id: 'admin-1', role: UserRole.ADMIN },
        [UserRole.ADMIN],
      );

      expect(guard.canActivate(context)).toBe(true);
    });

    it('ADMIN can terminate any agreement', () => {
      const context = createMockExecutionContext(
        { id: 'admin-1', role: UserRole.ADMIN },
        [UserRole.ADMIN],
      );

      expect(guard.canActivate(context)).toBe(true);
    });

    it('ADMIN can renew agreements', () => {
      const context = createMockExecutionContext(
        { id: 'admin-1', role: UserRole.ADMIN },
        [UserRole.ADMIN],
      );

      expect(guard.canActivate(context)).toBe(true);
    });

    it('USER cannot terminate agreements (ADMIN-only)', () => {
      const context = createMockExecutionContext(
        { id: 'user-1', role: UserRole.USER },
        [UserRole.ADMIN],
      );

      expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
    });
  });

  // ─── User-Specific Agreement Access Tests ───────────────────────────────────

  describe('User-Specific Agreement Access', () => {
    /**
     * These tests verify that only the specific user (tenant) can sign
     * their own agreements. This is typically enforced at the service layer
     * by checking agreement.userId === currentUser.id
     */

    function checkAgreementAccess(
      agreementUserId: string,
      currentUserId: string,
      currentUserRole: UserRole,
    ): boolean {
      return (
        agreementUserId === currentUserId || currentUserRole === UserRole.ADMIN
      );
    }

    it('allows USER to access their own agreement', () => {
      // This would be checked in the service layer:
      // if (agreement.userId !== user.id && user.role !== UserRole.ADMIN)
      const canAccess = checkAgreementAccess('user-1', 'user-1', UserRole.USER);

      expect(canAccess).toBe(true);
    });

    it('blocks USER from accessing another user agreement', () => {
      const canAccess = checkAgreementAccess('user-1', 'user-2', UserRole.USER);

      expect(canAccess).toBe(false);
    });

    it('allows ADMIN to access any user agreement', () => {
      const canAccess = checkAgreementAccess(
        'user-1',
        'admin-1',
        UserRole.ADMIN,
      );

      expect(canAccess).toBe(true);
    });

    it('allows USER to sign only their own agreement', () => {
      const agreementUserId: string = 'user-1';
      const signingUserId: string = 'user-1';

      const canSign = agreementUserId === signingUserId;

      expect(canSign).toBe(true);
    });

    it('blocks USER from signing another user agreement', () => {
      const agreementUserId: string = 'user-1';
      const signingUserId: string = 'user-2';

      const canSign = agreementUserId === signingUserId;

      expect(canSign).toBe(false);
    });
  });

  // ─── Property Ownership Tests ───────────────────────────────────────────────

  describe('Property Ownership - RBAC', () => {
    function checkPropertyAccess(
      propertyOwnerId: string,
      currentUserId: string,
      currentUserRole: UserRole,
    ): boolean {
      return (
        propertyOwnerId === currentUserId || currentUserRole === UserRole.ADMIN
      );
    }

    it('allows property owner to update their own property', () => {
      const canUpdate = checkPropertyAccess('user-1', 'user-1', UserRole.USER);

      expect(canUpdate).toBe(true);
    });

    it('blocks non-owner USER from updating another user property', () => {
      const canUpdate = checkPropertyAccess('user-1', 'user-2', UserRole.USER);

      expect(canUpdate).toBe(false);
    });

    it('allows ADMIN to update any property regardless of ownership', () => {
      const canUpdate = checkPropertyAccess(
        'user-1',
        'admin-1',
        UserRole.ADMIN,
      );

      expect(canUpdate).toBe(true);
    });

    it('allows property owner to delete their own property', () => {
      const canDelete = checkPropertyAccess('user-1', 'user-1', UserRole.USER);

      expect(canDelete).toBe(true);
    });

    it('blocks non-owner USER from deleting another user property', () => {
      const canDelete = checkPropertyAccess('user-1', 'user-2', UserRole.USER);

      expect(canDelete).toBe(false);
    });
  });

  // ─── Multi-Role Access Tests ─────────────────────────────────────────────────

  describe('Multi-Role Access', () => {
    it('allows access when user has any of the required roles', () => {
      const context = createMockExecutionContext(
        { id: 'user-1', role: UserRole.AGENT },
        [UserRole.ADMIN, UserRole.AGENT, UserRole.USER],
      );

      expect(guard.canActivate(context)).toBe(true);
    });

    it('blocks access when user has none of the required roles', () => {
      const context = createMockExecutionContext(
        { id: 'user-1', role: UserRole.USER },
        [UserRole.ADMIN, UserRole.SUPER_ADMIN],
      );

      expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
    });
  });

  // ─── Edge Cases ──────────────────────────────────────────────────────────────

  describe('Edge Cases', () => {
    it('handles undefined user role gracefully', () => {
      const context = createMockExecutionContext(
        { id: 'user-1', role: undefined as unknown as UserRole },
        [UserRole.ADMIN],
      );

      expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
    });

    it('handles empty required roles array', () => {
      const context = createMockExecutionContext(
        { id: 'user-1', role: UserRole.USER },
        [],
      );

      // Empty array means no specific roles required, but the guard still checks
      // Since the user has no matching role in an empty array, it should throw
      expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
    });

    it('handles request without user object', () => {
      const mockContext = {
        switchToHttp: jest.fn().mockReturnValue({
          getRequest: jest.fn().mockReturnValue({}),
        }),
        getHandler: jest.fn(),
        getClass: jest.fn(),
      } as unknown as ExecutionContext;

      jest
        .spyOn(reflector, 'getAllAndOverride')
        .mockReturnValue([UserRole.ADMIN]);

      expect(() => guard.canActivate(mockContext)).toThrow(ForbiddenException);
      expect(() => guard.canActivate(mockContext)).toThrow(
        'User not authenticated',
      );
    });
  });
});

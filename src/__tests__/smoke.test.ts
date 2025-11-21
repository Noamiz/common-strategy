import { describe, expect, it } from 'vitest';
import { APP_NAME, consoleLogger, ENV } from '..';
import type { AuthToken, Result, User } from '..';

describe('common-strategy public surface', () => {
  it('exposes APP_NAME via the package entrypoint', () => {
    expect(APP_NAME).toBeDefined();
    expect(APP_NAME.length).toBeGreaterThan(0);
  });

  it('provides env helpers that reflect NODE_ENV', () => {
    // NODE_ENV is undefined in Vitest by default, so ENV.isDev should be true.
    expect(ENV.isDev).toBe(true);
    expect(ENV.isProd).toBe(false);
  });

  it('ships with a console logger implementation', () => {
    expect(typeof consoleLogger.info).toBe('function');
    expect(typeof consoleLogger.error).toBe('function');
  });

  it('provides typed user/auth/result models', () => {
    const sampleUser: User = {
      id: '00000000-0000-0000-0000-000000000000',
      email: 'user@example.com',
      isActive: true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const authToken: AuthToken = {
      token: 'token-123',
      issuedAt: Date.now(),
      expiresAt: Date.now() + 60_000,
    };
    const successResult: Result<User> = { ok: true, data: sampleUser };
    const errorResult: Result<User> = {
      ok: false,
      error: { code: 'VALIDATION_ERROR', message: 'Invalid' },
    };

    expect(sampleUser.email).toBe('user@example.com');
    expect(authToken.token).toContain('token');
    expect(successResult.ok).toBe(true);
    expect(errorResult.ok).toBe(false);
  });
});


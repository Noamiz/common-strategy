import { describe, expect, it } from 'vitest';
import { APP_NAME, consoleLogger, ENV } from '..';

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
});


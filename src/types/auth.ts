import type { UnixMs } from './base';
import type { EmailAddress } from './user';
import type { User } from './user';

export type VerificationCode = string; // e.g. "123456"

export interface AuthToken {
  /**
   * Token value used for authenticating requests.
   * Implementation can be JWT or opaque string.
   */
  token: string;
  issuedAt: UnixMs;
  expiresAt: UnixMs;
}

/**
 * Convenience shape combining the user and their token.
 * Useful for server-side code when issuing / checking sessions.
 */
export interface AuthSession {
  user: User;
  token: AuthToken;
}

// --- DTOs for /auth/send-code ---

export interface AuthSendCodeRequest {
  email: EmailAddress;
}

export interface AuthSendCodeResponse {
  /**
   * When the verification code will expire.
   */
  expiresAt: UnixMs;
  /**
   * Optional partially masked destination (e.g. "u***@example.com")
   * for UX feedback.
   */
  maskedDestination?: string;
}

// --- DTOs for /auth/verify-code ---

export interface AuthVerifyCodeRequest {
  email: EmailAddress;
  code: VerificationCode;
}

export interface AuthVerifyCodeSuccess {
  user: User;
  token: AuthToken;
}

// --- DTOs for /auth/me (optional) ---

export interface AuthMeResponse {
  user: User;
}


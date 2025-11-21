import type { UUID } from './base';

export type ErrorCode =
  | 'VALIDATION_ERROR'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'TOO_MANY_REQUESTS'
  | 'INTERNAL_SERVER_ERROR';

export interface ApiError {
  code: ErrorCode;
  /**
   * Human-readable error message, safe to show in UI (or mapped to UX copy).
   */
  message: string;
  /**
   * Optional machine-readable details for debugging or client logic.
   * This should not contain secrets or extremely sensitive data.
   */
  details?: unknown;
  /**
   * Optional trace/correlation ID for logs and observability.
   */
  traceId?: UUID;
}

/**
 * Standard result wrapper for HTTP APIs:
 * - On success: { ok: true, data: T }
 * - On error:   { ok: false, error: ApiError }
 *
 * Can be used as a concrete response body or an internal service-to-service shape.
 */
export type Result<T> =
  | { ok: true; data: T }
  | { ok: false; error: ApiError };


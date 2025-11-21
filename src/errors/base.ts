import type { UnixMs } from '../types';

export type ErrorCode = string; // TODO: Standardize shared error codes per domain.

export interface CommonError {
  code: ErrorCode;
  message: string;
  details?: Record<string, unknown>;
  timestamp?: UnixMs;
  retryable?: boolean;
}

export interface ValidationError extends CommonError {
  field?: string;
}

/**
 * Lightweight helper so other repos have a single place to build errors.
 * Additional metadata (HTTP status, gateway channel, etc.) can be layered later.
 */
export const createError = (error: CommonError): CommonError => ({
  timestamp: Date.now(),
  ...error,
});


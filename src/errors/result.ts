import type { CommonError } from './base';

export type Result<T, E extends CommonError = CommonError> =
  | { ok: true; value: T }
  | { ok: false; error: E };

export const ok = <T>(value: T): Result<T> => ({ ok: true, value });

export const err = <E extends CommonError>(error: E): Result<never, E> => ({ ok: false, error });

// TODO: Consider richer helpers (e.g., match, map) once downstream repos exercise the Result type.


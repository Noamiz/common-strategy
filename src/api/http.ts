import type { UUID, UnixMs } from '../types';

/**
 * Shared wrapper for HTTP responses between services.
 * TODO: Align with server-strategy's eventual API response envelope once defined.
 */
export interface ApiEnvelope<TPayload = unknown> {
  requestId: UUID;
  timestamp: UnixMs;
  payload: TPayload;
  version?: string;
  meta?: Record<string, unknown>;
}

/**
 * General shape for cursor-based pagination results.
 * TODO: Extend with additional pagination strategies (offset, keyset) when requirements land.
 */
export interface PaginatedResult<TItem> {
  items: TItem[];
  total: number;
  cursor?: string;
  hasMore: boolean;
}


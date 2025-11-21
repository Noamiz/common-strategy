import type { CommonError } from '../errors';
import type { UUID, UnixMs } from '../types';

export type GatewayChannel = string; // TODO: Replace with concrete channel enums once defined.

export interface GatewayEnvelope<TEvent extends string = string, TPayload = unknown> {
  channel: GatewayChannel;
  event: TEvent;
  payload: TPayload;
  requestId?: UUID;
  issuedAt?: UnixMs;
  version?: string;
}

export interface GatewayAck<TPayload = unknown> {
  ok: boolean;
  requestId?: UUID;
  payload?: TPayload;
  error?: CommonError;
}

export interface SubscriptionCursor {
  channel: GatewayChannel;
  lastEventId?: UUID;
}


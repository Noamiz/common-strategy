export type UUID = string; // e.g. "9a4d8f6a-..."
export type UnixMs = number; // Date.now() style timestamp in milliseconds

export interface BaseEntity {
  id: UUID;
  createdAt: UnixMs;
  updatedAt: UnixMs;
}

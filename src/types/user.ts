import type { BaseEntity } from './base';

export type EmailAddress = string;

export interface User extends BaseEntity {
  email: EmailAddress;
  /**
   * Optional display name chosen by the user.
   * Can be shown in UIs instead of the raw email.
   */
  displayName?: string;
  /**
   * Whether the user is active (not soft-deleted / blocked).
   */
  isActive: boolean;
}


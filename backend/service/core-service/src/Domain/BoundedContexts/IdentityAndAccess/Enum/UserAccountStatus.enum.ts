/**
 * Represents the various states a user account can be in.
 *
 * @enum UserAccountStatus
 *
 * @property {string} activate   - The account is active and the user can access the system normally.
 * @property {string} deactivate - The account is temporarily disabled and cannot access the system.
 * @property {string} banded     - The account has been banned and permanently blocked from access.
 */
export enum UserAccountStatus {
  activate = "activate",
  deactivate = "deactivate",
  banded = "banded",
}

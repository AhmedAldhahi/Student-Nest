/**
 * Represents the possible roles a user can have within the system.
 *
 * @enum UserRole
 * @property {string} admin - System administrator with full privileges.
 * @property {string} landloard - Landlord role, representing property owners.
 * @property {string} student - Student role, representing property seekers.
 */
export enum UserRole {
  admin = "admin",
  landlord = "landlord",
  student = "student",
}

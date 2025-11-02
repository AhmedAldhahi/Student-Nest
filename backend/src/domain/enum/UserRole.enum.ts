/**
 * Represents the available roles a user can have within the system.
 * 
 * @enum {string}
 * @category Domain
 * @example
 * ```ts
 * import { UserRole } from './UserRole';
 * 
 * const role = UserRole.admin;
 * console.log(role); // "admin"
 * ```
 */
export enum UserRole {
    /**
     * Administrator with full access to all system resources and management functions.
     */
    admin = 'admin',
  
    /**
     * Landlord — property owner or manager responsible for listings and maintenance.
     */
    landloard = 'landloard',
  
    /**
     * Student — tenant or user seeking accommodations.
     */
    student = 'student',
  }
  
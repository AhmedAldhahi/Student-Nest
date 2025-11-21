import { IUserRepository } from "./UserRepositories.repositories";
import { ILandlordRepository } from "./LandlordRepositories.repositories";
import { IStudentRepository } from "./StudentRepositories.repositories";

/**
 * Defines the Unit of Work pattern for coordinating multiple repositories.
 *
 * Provides a single transactional boundary to ensure all operations
 * across user, landlord, and student repositories are consistent.
 *
 * @interface IUnitOfWork
 */
export interface IUnitOfWork {
  /** User repository instance for user-related persistence operations. */
  userRepo: IUserRepository;

  /** Landlord repository instance for landlord-related persistence operations. */
  landlordRepo: ILandlordRepository;

  /** Student repository instance for student-related persistence operations. */
  studentRepo: IStudentRepository;

  /**
   * Starts a new transaction across all repositories.
   *
   * @returns {Promise<void>}
   */
  startTransaction(): Promise<void>;

  /**
   * Commits the current transaction, persisting all changes.
   *
   * @returns {Promise<void>}
   */
  commitTransaction(): Promise<void>;

  /**
   * Rolls back the current transaction, discarding all changes.
   *
   * @returns {Promise<void>}
   */
  rollbackTransaction(): Promise<void>;

  /**
   * Releases the transaction context and associated resources.
   *
   * @returns {Promise<void>}
   */
  releaseTransaction(): Promise<void>;
}

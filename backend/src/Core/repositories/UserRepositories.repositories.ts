import { UserEntity } from "../entites/userEntity.entity";

/**
 * Repository contract for UserEntity persistence operations.
 *
 * This interface defines all required methods for interacting with
 * the user data store, following the Repository Pattern used in DDD.
 *
 * @interface IUserRepository
 */
export interface IUserRepository { 
    
  /**
   * Finds a user by their unique ID.
   *
   * @param {string} id - The unique user ID.
   * @returns {Promise<UserEntity | null>} The found UserEntity or null if not found.
   */
  findById(id: string): Promise<UserEntity | null>;

  /**
   * Finds a user using their email address.
   *
   * @param {string} email - User email address.
   * @returns {Promise<UserEntity | null>} The found UserEntity or null if not found.
   */
  findByEmail(email: string): Promise<UserEntity | null>;

  /**
   * Persists a newly created user entity.
   *
   * @param {UserEntity} user - The UserEntity instance to save.
   * @returns {Promise<void>}
   */
  addNewUser(user: UserEntity): Promise<void>;

  /**
   * Updates an existing user entity in the data store.
   *
   * @param {UserEntity} user - The UserEntity instance with updated data.
   * @returns {Promise<void>}
   */
  updateUser(user: UserEntity): Promise<void>;

  /**
   * Deletes a user from the system by ID.
   *
   * @param {string} id - The user ID to delete.
   * @returns {Promise<void>}
   */
  deleteUser(id: string): Promise<void>;
}

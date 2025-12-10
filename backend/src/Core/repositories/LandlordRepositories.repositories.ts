import { LandlordEntity } from "../entites/landloardEntity.entity";

/**
 * Repository contract for LandlordEntity persistence operations.
 *
 * Defines methods for creating and updating landlord entities in the data store.
 *
 * @interface ILandlordRepository
 */
export interface ILandlordRepository {
  /**
   * Persists a newly created LandlordEntity.
   *
   * @param {LandlordEntity} user - The LandlordEntity instance to save.
   * @returns {Promise<void>}
   */
  createNewLandlord(user: LandlordEntity): Promise<void>;

  /**
   * Updates an existing LandlordEntity in the data store.
   *
   * @param {LandlordEntity} user - The LandlordEntity instance with updated data.
   * @returns {Promise<void>}
   */
  updateLandlord(user: LandlordEntity): Promise<void>;

  findLandlordById(userId: string): Promise<LandlordEntity | null>;

  findAllLandlord(): Promise<LandlordEntity[] | null>;
}

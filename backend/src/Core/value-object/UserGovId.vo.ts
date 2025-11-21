/**
 * Value Object representing a user's government ID.
 *
 * Encapsulates validation logic to ensure the ID is exactly 10 digits long
 * and contains only numeric characters.
 *
 * @class GovernmentID
 */
export class GovernmentID {
  /** The validated government ID value. */
  private readonly value: string;

  /**
   * Creates a new GovernmentID value object and validates it.
   *
   * @param {string} id - The government ID string.
   * @throws {Error} Throws if the ID is not exactly 10 digits or contains non-numeric characters.
   */
  constructor(id: string) {
    this.validate(id);
    this.value = id;
  }

  /**
   * Validates the government ID format.
   *
   * @private
   * @param {string} id - The government ID to validate.
   * @throws {Error} If the ID is invalid.
   */
  private validate(id: string): void { 
    if (id.length !== 10) {
      throw new Error("user Government id number must contain 10 number ");
    }

    if (!/^\d+$/.test(id)) {
      throw new Error(" user Government id number must contain just number ");
    }
  }

  /**
   * Returns the validated government ID string.
   *
   * @returns {string} The government ID.
   */
  public getValue(): string {
    return this.value;
  }
}

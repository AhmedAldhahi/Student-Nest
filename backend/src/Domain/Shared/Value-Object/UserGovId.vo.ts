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

  /**
   * Creates a new GovernmentID value object and validates it.
   *
   * @param {string} id - The government ID string.
   * @throws {Error} Throws if the ID is not exactly 10 digits or contains non-numeric characters.
   */
  constructor(private value?: string | undefined) {
    if (!this.value) {
      this.value = undefined;
    }
  }

  public static create(value: string): GovernmentID {
    if (!value || value.trim().length === 0)
      throw new Error("the government id is require");

    this.validate(value);

    return new GovernmentID(value);
  }

  /**
   * Validates the government ID format.
   *
   * @private
   * @param {string} id - The government ID to validate.
   * @throws {Error} If the ID is invalid.
   */
  private static validate(id: string): void {
    id = id.trim();

    // Check for negative numbers first
    if (id.startsWith("-")) {
      throw new Error("Negative numbers are not allowed.");
    }

    // Check for empty ID
    if (id.length === 0) {
      throw new Error("User Government ID cannot be empty.");
    }

    // Check for exact length of 10 digits
    if (id.length !== 10) {
      throw new Error("User Government ID number must be exactly 10 digits.");
    }

    // Check for leading zero
    if (id.startsWith("0")) {
      throw new Error("User Government ID cannot start with a leading zero.");
    }

    // Check for numeric characters only
    if (!/^\d+$/.test(id)) {
      throw new Error(
        "User Government ID number must contain only numeric digits."
      );
    }
  }

  /**
   * Returns the validated government ID string.
   *
   * @returns {string} The government ID.
   */
  public getValue(): string | undefined {
    return this.value ?? undefined;
  }
}

/**
 * Value Object representing a user's name.
 *
 * Encapsulates validation logic to ensure the name is well-formed.
 * Rules:
 * - Must be at least 3 characters long
 * - Must start with a letter
 * - Can contain letters, numbers, and underscores
 * - No spaces allowed
 *
 * @class UserName
 */
export class UserName {
  /**
   * Creates a new UserName value object and validates it.
   *
   * @param {string} value - The user's name string.
   * @throws {Error} Throws if the name is empty, too short, or contains invalid characters.
   */
  constructor(private value: string) {
    if (!value) {
      throw new Error("User name is required");
    }
    const trimmed = value.trim();

    if (trimmed.length < 3) {
      throw new Error("User name is too short or null");
    } 

    if (trimmed.length > 25) {
      throw new Error ("UserName must be at most 25 characters long.");
    }

    if (!/^[A-Za-z][A-Za-z0-9_]*$/.test(trimmed)) {
      throw new Error(
        "Name must start with a letter and can only contain letters, numbers, or underscores"
      );
    }
  }

  /**
   * Returns the validated user name.
   *
   * @returns {string} The user's name string.
   */
  public getValue(): string {
    return this.value;
  }
}

/**
 * Value Object representing a student's card ID.
 *
 * Encapsulates validation logic to ensure:
 * - A student card value is provided
 * - The card ID has at least 8 characters
 *
 * @class StudentCard
 */
export class StudentCard {
  /** The validated student card ID. */
  constructor(private value: string) {
    if (!value) throw new Error("student card is required");
    const trimmed = value.trim();
    if (trimmed.length < 8) {
      throw new Error("Invalid student card id ");
    }
  }

  /**
   * Returns the validated student card ID.
   *
   * @returns {string} The student's card ID.
   */
  public getValue(): string {
    return this.value;
  }
}

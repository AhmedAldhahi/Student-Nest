import { defaultYear } from "../../Shared/constants/helperValue.constant";

/**
 * Value Object representing a user's date of birth.
 *
 * Encapsulates validation logic to ensure:
 * - A date of birth is provided
 * - The value is a valid number
 * - The user is at least 18 years old
 *
 * @class UserDateOfBirth
 */
export class UserDateOfBirth {
  /** The validated date of birth string. */
  constructor(private value?: string | undefined) {
    if (!value) {
      this.value = undefined;
    }
  }

  public static create(value: string): UserDateOfBirth {
    if (!value) throw new Error("Date of birth is required for registration");

    // Create the object
    const dob = new UserDateOfBirth(value);

    // Enforce Business Rule (18+)
    if (!dob.validate(value)) {
      throw new Error("The User must be at least 18 !!");
    }

    return dob;
  }

  private validate(value: string): boolean {
    if (!value) return false;
    const Dob = Number.parseInt(value);

    return defaultYear - Dob >= 18;
  }

  /**
   * Returns the validated date of birth string.
   *
   * @returns {string} The user's date of birth.
   */
  public getValue(): string | undefined {
    return this.value ?? undefined;
  }
}

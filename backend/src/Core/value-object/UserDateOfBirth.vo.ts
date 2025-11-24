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
  constructor(private value: string) {
    if (!value) throw new Error("date of birth is required");

    const Dob = Number.parseInt(value);

    if (Number.isNaN(Dob)) throw new Error("the date of birth must be number");

    if (defaultYear - Dob < 18) {
      throw new Error("the User must be at least 18 !!");
    }
  }

  /**
   * Returns the validated date of birth string.
   *
   * @returns {string} The user's date of birth.
   */
  public getValue(): string {
    return this.value;
  }
}

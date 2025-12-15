/**
 * Value Object representing a user's email address.
 *
 * Encapsulates validation logic to ensure the email is valid
 * and has a minimum length of 10 characters.
 *
 * @class UserEmail
 */
export class UserEmail {
  /** The validated email string. */
  constructor(private value: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value || !emailRegex.test(value) || value.trim().length < 10) {
      throw new Error("A valid email is required.");
    }
  }

  /**
   * Returns the validated email string.
   *
   * @returns {string} The user's email.
   */
  public getValue(): string {
    return this.value;
  }
}

/**
 * Value Object representing a user's phone number.
 *
 * Encapsulates phone number validation and retrieval logic.
 * Supports both international format and Jordanian local format.
 *
 * @class userPhoneNumber
 */
export class userPhoneNumber {
  /**
   * Creates a new userPhoneNumber value object and validates it.
   *
   * @param {string} value - The phone number string.
   * @throws {Error} Throws if the phone number is empty or invalid format.
   */
  constructor(private value: string) {
    if (!value) throw new Error("Phone number is required");

    const trimmed = value.trim();

    const phoneRegex = /^(?:\+?[1-9]\d{1,14}|(?:\+9627|009627|07)[7-9]\d{7})$/;

    if (!phoneRegex.test(trimmed)) {
      throw new Error(
        "Invalid phone number. Use international format (+[country code][number]) or Jordanian format (+9627XXXXXXXX, 009627XXXXXXXX, 07XXXXXXXX)."
      );
    }
  }

  /**
   * Returns the phone number string.
   *
   * @returns {string} The validated phone number.
   */
  public getValue(): string {
    return this.value;
  }
}

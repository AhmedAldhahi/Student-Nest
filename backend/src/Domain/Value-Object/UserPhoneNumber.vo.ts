export class userPhoneNumber {
  /**
   * Creates a new userPhoneNumber value object and validates it.
   *
   * @param {string} value - The phone number string.
   * @throws {Error} Throws if the phone number is empty or invalid format.
   */
  constructor(private value: string) {
    if (!value || value.trim().length === 0)
      throw new Error("Phone number is required");

    const trimmed = value.trim();

    // Updated regex to allow spaces or hyphens after the country code (+962)

    const phoneRegex = /^(?:(?:\+962|00)\s?0?|0)?\s?(7[789])\s?(\d{7})$/;

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

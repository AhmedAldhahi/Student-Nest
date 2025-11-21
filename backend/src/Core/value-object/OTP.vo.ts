/**
 * Value Object representing a One-Time Password (OTP).
 *
 * Encapsulates OTP generation, expiration, and verification logic.
 *
 * @class OTP
 */
export class OTP {
  /** The OTP expiration date. */
  private readonly expiresAt: Date;

  /** The OTP value string. */
  private readonly value: string;

  /**
   * Creates a new OTP value object with optional expiration time.
   *
   * @param {string} value - The OTP string value.
   * @param {number} [expiresInMinutes=10] - Time in minutes until the OTP expires.
   */
  constructor(value: string, expiresInMinutes = 10) {
    this.value = value;
    this.expiresAt = new Date(Date.now() + expiresInMinutes * 60000);
  }

  /**
   * Generates a new 6-digit OTP.
   *
   * @static
   * @returns {OTP} A new OTP instance.
   */
  public static generate(): OTP {
    const val = Math.floor(100000 + Math.random() * 900000).toString();
    return new OTP(val);
  }

  /**
   * Returns the expiration date of the OTP.
   *
   * @returns {Date} The expiration date.
   */
  public getExpiresAt(): Date {
    return this.expiresAt;
  }

  /**
   * Returns the OTP value string.
   *
   * @returns {string} The OTP value.
   */
  public getValue(): string {
    return this.value;
  }

  /**
   * Checks if the OTP has expired.
   *
   * @returns {boolean} True if expired, false otherwise.
   */
  public isExpired(): boolean {
    return new Date() > this.expiresAt;
  }

  /**
   * Verifies the provided OTP against the stored value.
   *
   * @param {string} clientOtp - The OTP provided by the client.
   * @returns {boolean} True if OTP is valid.
   * @throws {Error} Throws if OTP is expired or invalid.
   */
  public verfiedOtp(clientOtp: string): boolean {
    if (this.isExpired()) {
      throw new Error("OTP has expired.");
    }

    if (clientOtp !== this.value) {
      throw new Error("Invalid OTP code.");
    }

    return true;
  }
}

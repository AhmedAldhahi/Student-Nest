//   public static generate(): OTP {
//     const val = Math.floor(100000 + Math.random() * 900000).toString();
//     return new OTP(val);
//   }

//   /**
//    * Returns the expiration date of the OTP.
//    *
//    * @returns {Date} The expiration date.
//    */
//   public getExpiresAt(): Date {
//     return this.expiresAt;
//   }

//   /**
//    * Returns the OTP value string.
//    *
//    * @returns {string} The OTP value.
//    */
//   public getValue(): string {
//     return this.value;
//   }

//   /**
//    * Checks if the OTP has expired.
//    *
//    * @returns {boolean} True if expired, false otherwise.
//    */
//   public isExpired(): boolean {
//     return new Date() > this.expiresAt;
//   }

//   /**
//    * Verifies the provided OTP against the stored value.
//    *
//    * @param {string} clientOtp - The OTP provided by the client.
//    * @returns {boolean} True if OTP is valid.
//    * @throws {Error} Throws if OTP is expired or invalid.
//    */
//   public verfiedOtp(clientOtp: string): boolean {
//     if (this.isExpired()) {
//       throw new Error("OTP has expired.");
//     }

//     if (clientOtp !== this.value) {
//       throw new Error("Invalid OTP code.");
//     }

//     return true;
//   }
// }


export class OTP {
  /** The OTP expiration date. */
  private readonly expiresAt: Date;

  /** The OTP value string. */
  private readonly value: string;

  /**
   * Creates an OTP instance.
   * * @param {string} value - The OTP string value.
   * @param {Date} expiresAt - The specific expiration date.
   */
  constructor(value: string, expiresAt: Date) {
    this.value = value;
    this.expiresAt = expiresAt;
  }

  /**
   * Generates a new 6-digit OTP.
   * Sets expiration to 10 minutes from NOW.
   */
  public static generate(): OTP {
    const val = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Logic for "10 minutes" belongs here, when creating a NEW otp
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);

    return new OTP(val, expiresAt);
  }

  public getExpiresAt(): Date {
    return this.expiresAt;
  }

  public getValue(): string {
    return this.value;
  }

  public isExpired(): boolean {
    return new Date() > this.expiresAt;
  }

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
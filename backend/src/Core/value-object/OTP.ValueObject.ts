import { OtpCodeException } from "../exception/OTPException.exception";

export class OTP {
  public static generate(): OTP {
    const val = Math.floor(100000 + Math.random() * 900000).toString();
    return new OTP(val);
  }

  private readonly expiresAt: Date;
  private readonly value: string;
  constructor(value: string, expiresInMinutes = 10) {
    this.value = value;
    this.expiresAt = new Date(Date.now() + expiresInMinutes * 60000);
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
      // 1. Check for expiration first
      throw new OtpCodeException("OTP has expired.");
    }

    if (clientOtp !== this.value) {
      // 2. Check if the value matches
      throw new OtpCodeException("Invalid OTP code.");
    }

    // 3. If it's not expired and matches, it's valid
    return true;
  }
}

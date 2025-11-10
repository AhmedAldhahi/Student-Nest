import { OtpCodeException } from "../exception/OTPException.exception";

export class OTP {
  private readonly value: string;
  private readonly expiresAt: Date;

  constructor(value: string, expiresInMinutes = 10) {
    this.value = value;
    this.expiresAt = new Date(Date.now() + expiresInMinutes * 60000);
  }

  public getValue(): string {
    return this.value;
  }

  public getExpiresAt(): Date {
    return this.expiresAt;
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

  public static generate(): OTP {
    const val = Math.floor(100000 + Math.random() * 900000).toString();
    return new OTP(val);
  }
}

import { UserRole } from "../enum/UserRole.enum";
import { NameException } from "../exception/NameException.exception";
import { UserAccountStatus } from "../enum/UserAccountStatus.enum";
import { EmailFormateException } from "../exception/EmailEsception.exception";
import { phoneNumberFormateException } from "../exception/PhonNumberException.exception";
import { IUser } from "../interface/IUser";
import { defaultYear } from "../../Shared/constants/helperValue.constant";
import { OTP } from "../value-object/OTP.ValueObject";

export class User implements IUser {
  protected accountStatus: UserAccountStatus = UserAccountStatus.activate;
  protected address?: string;
  protected dateOfBirth: string;
  protected email: string;
  protected emailVerfied: boolean = false;
  protected password: string;
  protected name: string;
  protected otpCode?: string | undefined | null;
  protected otpExpired?: Date | undefined | null;
  protected phoneNumber: string;
  protected photo?: string;
  protected role: UserRole;
  protected userId: string;

  /* ... other methods ... */
  public ActiveteAccount(): void {
    this.accountStatus = UserAccountStatus.activate;
  }
  public bandedAccount(): void {
    this.accountStatus = UserAccountStatus.banded;
  }
  public clearOtp(): void {
    this.otpCode = null;
    this.otpExpired = null;
  }
  public DeactivateAccount(): void {
    this.accountStatus = UserAccountStatus.deactivate;
  }
  public getAccountStatus(): UserAccountStatus {
    return this.accountStatus;
  }
  public getAddress(): string | undefined {
    return this.address;
  }
  public getDateOfBirth(): string {
    return this.dateOfBirth;
  }
  public getEmail(): string {
    return this.email;
  }
  public getName(): string {
    return this.name;
  }
  public getOtpCode(): string {
    if (!this.otpCode) throw new Error("no otp been found!");
    // --- THIS IS A FIX ---
    // The return type is string, so it cannot return null.
    // If it passes the check, it must be a string.
    return this.otpCode;
  }

  public getOtpExpired(): Date {
    if (!this.otpExpired) throw new Error("no otp expired found !");
    return this.otpExpired;
  }

  // ---  START: ADDED FUNCTIONS FOR MAPPER ---
  /**
   * Safely returns the OTP code (or null/undefined) for persistence mapping.
   * This is used by UserMapper.ts
   */
  public getOtpCodeRaw(): string | undefined | null {
    return this.otpCode;
  }

  /**
   * Safely returns the OTP expiration (or null/undefined) for persistence mapping.
   * This is used by UserMapper.ts
   */
  public getOtpExpiredRaw(): Date | undefined | null {
    return this.otpExpired;
  }
  // ---  END: ADDED FUNCTIONS FOR MAPPER ---

  public hasOtpCode(): boolean {
    return !!this.otpCode;
  }
  public getPassword(): string {
    return this.password;
  }
  public getPhoeNumber(): string {
    return this.phoneNumber;
  }
  getPhoto(): string | undefined {
    return this.photo;
  }
  public getRole(): UserRole {
    return this.role;
  }
  public getUserId(): string {
    return this.userId;
  }

  public getVerfiedEmail(): boolean {
    return this.emailVerfied;
  }

  public setAccountStatus(status: UserAccountStatus): void {
    this.accountStatus = status;
  }

  /* ... other setters ... */
  public setAddress(userAddress: string): void {
    this.address = userAddress;
  }
  public setDateOfBirth(dob: string): void {
    if (!dob) throw new Error("date of birth is required");
    const Dob = Number.parseInt(dob);
    if (Number.isNaN(Dob)) throw new Error("the date of birth must be number");
    if (defaultYear - Dob < 18) {
      throw new Error("the student must be at least 18 !!");
    }
    this.dateOfBirth = dob;
  }
  public setEmail(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email) || email.trim().length < 10) {
      throw new EmailFormateException("A valid email is required.");
    }
    this.email = email;
  }
  public setName(userName: string): void {
    if (!userName) {
      throw new NameException("User name is required");
    }
    const trimmed = userName.trim();
    if (trimmed.toString().length < 3) {
      throw new NameException("user name is too short");
    }
    if (/\s/.test(trimmed)) {
      throw new NameException("Name cannot contain spaces");
    }
    // first char must be alphabetic symbol
    if (!/^[A-Za-z]/.test(trimmed)) {
      throw new NameException("Name must start with a letter");
    }
    //number, alphabetic, underscore just allow
    if (!/^[A-Za-z][A-Za-z0-9_]*$/.test(trimmed)) {
      throw new NameException(
        "Name can only contain letters, numbers, or underscores"
      );
    }
    this.name = trimmed;
  }
  public setOtp(otp: OTP): void {
    this.otpCode = otp.getValue();
    this.otpExpired = otp.getExpiresAt();
  }
  // for the infrastructure to read it
  public setOtpCode(code?: string): void {
    this.otpCode = code || undefined;
  }
  public setOtpExpired(date: Date | undefined | null): void {
    // This handles mapping null/undefined from the database
    this.otpExpired = date || undefined;
  }

  setUserId(userId: string): void {
    this.userId = userId;
  }

  /**
   * This method is for use cases (like verifying OTP)
   * to mark the email as verified.
   */
  public setVerfiedEmail(): void {
    this.emailVerfied = true;
  }

  /**
   * --- THIS IS THE FIX ---
   * This new method allows the mapper to correctly
   * set the verification status when loading from the DB.
   */
  public setEmailVerfiedStatus(isVerified: boolean): void {
    this.emailVerfied = isVerified;
  }

  public setPass(userPass: string): void {
    this.password = userPass;
  }

  public setRole(role: UserRole): void {
    this.role = role;
  }
  public setPhoneNumber(phone: string): void {
    if (!phone) throw new Error("Phone number is required");
    const trimmed = phone.trim();
    // Accept both:
    // 1. Global E.164 format (+[country_code][number])
    // 2. Jordan local formats (+9627XXXXXXXX, 009627XXXXXXXX, or 07XXXXXXXX)
    const globalPhoneRegex =
      /^(?:\+?[1-9]\d{1,14}|(?:\+9627|009627|07)([7-9][0-9]{7}))$/;
    if (!globalPhoneRegex.test(trimmed)) {
      throw new phoneNumberFormateException();
    }
    this.phoneNumber = trimmed;
  }
  public setPhoto(photoUrl: string): void {
    this.photo = photoUrl;
  }
}
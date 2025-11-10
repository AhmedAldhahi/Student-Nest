import { UserRole } from "../enum/UserRole.enum";
import { NameException } from "../exception/NameException.exception";
import { UserAccountStatus } from "../enum/UserAccountStatus.enum";
import { EmailFormateException } from "../exception/EmailEsception.exception";
import { phoneNumberFormateException } from "../exception/PhonNumberException.exception";
import { IUser } from "../repositories/IUser";
import { defaultYear } from "../../Shared/constants/helperValue.constant";
import { OTP } from "../value-object/OTP.ValueObject";

export class User implements IUser {
  protected userId: string;
  protected hashPassword: string;

  protected email: string;
  protected emailVerfied: boolean = false;

  protected name: string;
  protected role: UserRole;
  protected dateOfBirth: number;

  protected accountStatus: UserAccountStatus = UserAccountStatus.activate;

  protected phoneNumber: string;
  protected photo?: string;
  protected address?: string;

  protected otpCode?: string;
  protected otpExpired?: Date;

  public setOtp(otp: OTP): void {
    this.otpCode = otp.getValue();
    this.otpExpired = otp.getExpiresAt();
  }

  // for the infrastrcture to read it
  public setOtpCode(code?: string): void {
    this.otpCode = code || undefined;
  }

  public getOtpCode(): string {
    if (!this.otpCode) throw new Error("no otp been found!");
    return this.otpCode;
  }

  public getOtpExpired(): Date {
    if (!this.otpExpired) throw new Error("no otp expired found !");
    return this.otpExpired;
  }

  public setOtpExpired(date: Date | undefined | null): void {
    // This handles mapping null/undefined from the database
    this.otpExpired = date || undefined;
  }

  public clearOtp(): void {
    this.otpCode = undefined;
    this.otpExpired = undefined;
  }

  getPhoto(): string | undefined {
    return this.photo;
  }
  setUserId(userId: string): void {
    this.userId = userId;
  }

  public getUserId(): string {
    return this.userId;
  }

  public getDateOfBirth(): number {
    return this.dateOfBirth;
  }

  public getPassword(): string {
    return this.hashPassword;
  }

  public getEmail(): string {
    return this.email;
  }
  public getVerfiedEmail(): boolean {
    return this.emailVerfied;
  }
  public getName(): string {
    return this.name;
  }
  public getRole(): UserRole {
    return this.role;
  }
  public getPhoeNumber(): string {
    return this.phoneNumber;
  }

  public getAddress(): string | undefined {
    return this.address;
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

    // first char must be alphabtic symbol
    if (!/^[A-Za-z]/.test(trimmed)) {
      throw new NameException("Name must start with a letter");
    }

    //number, alphabtic, underscore just allow
    if (!/^[A-Za-z][A-Za-z0-9_]*$/.test(trimmed)) {
      throw new NameException(
        "Name can only contain letters, numbers, or underscores"
      );
    }
    this.name = trimmed;
  }

  public setVerfiedEmail(): void {
    this.emailVerfied = true;
  }

  public setAddress(userAddress: string): void {
    this.address = userAddress;
  }

  public setPass(userPass: string): void {
    this.hashPassword = userPass;
  }

  public setEmail(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email) || email.trim().length < 10) {
      throw new EmailFormateException("A valid email is required.");
    }

    if (this.role === UserRole.student) {
      const emailStuFormate = email.endsWith(".edu.jo");
      if (!emailStuFormate) {
        throw new EmailFormateException();
      }

      this.email = email;
    }

    this.email = email;
  }

  public setRole(role: UserRole): void {
    this.role = role;
  }

  public setDateOfBirth(dob: number): void {
    if (!dob) throw new Error("date of birth is required");

    if (Number.isNaN(dob)) throw new Error("the date of birth must be number");

    if (defaultYear - dob < 18) {
      throw new Error("the student must be at least 18 !!");
    }

    this.dateOfBirth = dob;
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

  public ActiveteAccount(): void {
    this.accountStatus = UserAccountStatus.activate;
  }

  public DeactivateAccount(): void {
    this.accountStatus = UserAccountStatus.deactivate;
  }

  public bandedAccount(): void {
    this.accountStatus = UserAccountStatus.banded;
  }

  public getAccountStatus(): UserAccountStatus {
    return this.accountStatus;
  }

  public setAccountStatus(status: UserAccountStatus): void {
    this.accountStatus = status;
  }
}

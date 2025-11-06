import { UserRole } from "../enum/UserRole.enum";
import { IUser } from "../interfaces/IUser.interface";
import { InvalidPhoneNumberException } from "../exceptions/InvalidPhoneNumberFormat.exception";
import { InvalidUserNameException } from "../exceptions/InvalidNameException.exception";
import { InvalidDateOfBirthException } from "../exceptions/InvalidDateOfBirthException.exception";
import { InvalidUserRoleErrorException } from "../exceptions/InvalidUserRoleException.exception";
import { InvalidIsActiveException } from "../exceptions/InvalidIsActiveException.exception";

export class User implements IUser {
  // ===== Auto-increment ID =====
  private static lastId = 0;

  protected userId: number;
  protected email: string;
  protected emailVerfied: boolean = false;
  protected name: string;
  protected password: string;
  protected role: UserRole;
  protected dateOfBirth: Date;
  protected isActive: boolean = true;
  protected phoneNumber: string;
  protected otpCode?: string;
  protected otpExpired?: Date;
  protected photo?: string;
  protected address?: string;

  constructor(
    email: string,
    name: string,
    password: string,
    role: UserRole,
    dateOfBirth: Date,
    phoneNumber: string,
    isActive?: boolean
  ) {
    this.userId = User.getNextId();
    this.setEmail(email);
    this.setName(name);
    this.password = password;
    this.setUserRole(role);
    this.setDateOfBirth(dateOfBirth);
    this.setPhoneNumber(phoneNumber);
    if (isActive !== undefined) this.setIsActive(isActive);
  }

  private static getNextId(): number {
    return ++User.lastId;
  }

  // ===== Getters & Setters =====
  public getUserId(): number { return this.userId; }

  public setEmail(email: string): void {
    if (!email) throw new InvalidPhoneNumberException();
    this.email = email;
  }
  public getUserEmail(): string { return this.email; }

  public setName(name: string): void {
    if (!name) throw new InvalidUserNameException();
    this.name = name;
  }
  public getName(): string { return this.name; }

  public setUserRole(role: UserRole): void {
    if (!role) throw new InvalidUserRoleErrorException();
    this.role = role;
  }
  public getUserRole(): UserRole { return this.role; }

  public setDateOfBirth(date: Date): void {
    if (!date) throw new InvalidDateOfBirthException();
    this.dateOfBirth = date;
  }
  public getDateOfBirth(): Date { return this.dateOfBirth; }

  public setIsActive(isActive: boolean): void {
    if (!isActive) throw new InvalidIsActiveException();
    this.isActive = isActive;
  }
  public getIsActive(): boolean { return this.isActive; }

  public setPhoneNumber(phone: string): void {
    if (!phone) throw new InvalidPhoneNumberException();
    this.phoneNumber = phone;
  }
  public getPhoneNumer(): string { return this.phoneNumber; }

  public setOtpCode(otp: string): void { this.otpCode = otp; }
  public getOtpCode(): string {
    if (!this.otpCode) throw new Error("No OTP code has been sent!");
    return this.otpCode;
  }

  public setOtpExpired(date: Date): void { this.otpExpired = date; }
  public getOtpExpired(): Date | undefined { return this.otpExpired; }

  public setAddress(address: string): void { this.address = address; }
  public getAddress(): string | undefined { return this.address; }

  public setPhoto(photo: string): void { this.photo = photo; }
  public getPhoto(): string | undefined { return this.photo; }

  public setEmailVerified(emailVerified: boolean): void { this.emailVerfied = emailVerified; }
  public getEmailVerified(): boolean { return this.emailVerfied; }
}

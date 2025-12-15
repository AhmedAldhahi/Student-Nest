/**
 * User data required to construct a UserEntity.
 *
 * @interface IUserData
 * @property {string} userId - Unique identifier for the user.
 * @property {string} password - User hashed password.
 * @property {UserName} name - Value object representing the user's name.
 * @property {UserDateOfBirth} dateOfBirth - Value object for the user's date of birth.
 * @property {userPhoneNumber} phoneNumber - Value object for the user's phone number.
 * @property {UserEmail} email - Value object for the user's email.
 * @property {UserRole} role - System assigned user role.
 * @property {string} [address] - Optional physical address.
 * @property {string} [photo] - Optional user profile photo URL or path.
 */

import { UserAccountStatus } from "../Enum/UserAccountStatus.enum";
import { UserRole } from "../Enum/UserRole.enum";
import { OTP } from "../Value-Object/OTP.vo";
import { UserDateOfBirth } from "../Value-Object/UserDateOfBirth.vo";
import { UserEmail } from "../Value-Object/UserEmail.vo";
import { UserName } from "../Value-Object/UserName.vo";
import { userPhoneNumber } from "../Value-Object/UserPhoneNumber.vo";


/**
 * Represents the domain User Aggregate Root.
 *
 * Handles:
 * - user identification
 * - email verification flow
 * - reset-password OTP flow
 * - domain value objects (email, name, phone, etc.)
 * - role & account status management
 *
 * @class UserEntity
 */
export interface IUserData {
  userId: string;
  password: string;
  name: UserName;
  dateOfBirth: UserDateOfBirth;
  phoneNumber: userPhoneNumber;
  email: UserEmail;
  role: UserRole;
  address?: string;
  photo?: string;
  createdAt: Date;
}

export class UserEntity {
  private userId: string;
  private password: string;

  private name: UserName;
  private dateOfBirth: UserDateOfBirth;
  private phoneNumber: userPhoneNumber;
  private email: UserEmail;

  protected role: UserRole;
  protected accountStats: UserAccountStatus = UserAccountStatus.activate;

  private emailVerified: boolean = false;
  private resetPasswordVerified: boolean = false;

  private emailOTP?: OTP | undefined | null;
  private resetPasswordOTP?: OTP | undefined | null;

  private address?: string;
  private photo?: string;
  private createdAt: Date;

  /**
   * Creates a new UserEntity with the given domain value objects.
   *
   * @constructor
   * @param {IUserData} data - Initial user data.
   */
  constructor(data: IUserData) {
    this.userId = data.userId;
    this.password = data.password;
    this.name = data.name;
    this.dateOfBirth = data.dateOfBirth;
    this.phoneNumber = data.phoneNumber;
    this.email = data.email;
    this.role = data.role;
    this.createdAt = data.createdAt;
    this.address = data.address ?? undefined;
    this.photo = data.photo ?? undefined;
  }

  /** Sets a new userId. */
  public setUserId(userId: string): void {
    this.userId = userId;
  }

  /** Returns the user's ID. */
  public getUserId(): string {
    return this.userId;
  }

  /** Updates the user's email value object. */
  public updateEmail(userEmail: UserEmail) {
    this.email = userEmail;
  }

  /** Returns the user's email address. */
  public getEmail(): string {
    return this.email.getValue();
  }

  /** Marks the user's email as unverified. */
  public resetVerifiedEmail(): void {
    this.emailVerified = false;
  }

  /** Marks the user's email as verified. */
  public verifiedEmail() {
    this.emailVerified = true;
  }

  /** Returns whether the user's email is verified. */
  public getVerifiedEmail(): boolean {
    return this.emailVerified;
  }

  /** Assigns an OTP for verifying the email. */
  public setOtpForEmail(otp: OTP): void {
    this.emailOTP = otp;
  }

  /** Gets the email OTP value. */
  public getOtpForEmail(): string | undefined | null {
    return this.emailOTP?.getValue();
  }

  /** Gets the email OTP expiration timestamp. */
  public getOtpExpiredForEmail(): Date | undefined | null {
    return this.emailOTP?.getExpiresAt();
  }

  /**
   * Verifies the user's email OTP.
   * Throws error if already verified or OTP missing.
   */
  public verifiedEmailOTP(clientOTP: string) {
    if (this.emailVerified) throw new Error("Email already verified.");
    if (!this.emailOTP) throw new Error("No OTP set for email verification.");

    // Check if OTP is expired
    if (new Date() > this.emailOTP.getExpiresAt())
      throw new Error("OTP expired.");

    const verified = this.emailOTP.verfiedOtp(clientOTP); // returns true if valid
    if (!verified) throw new Error("Invalid OTP code.");

    this.emailVerified = true;

    this.clearEmailOTP();
  }

  /** Clears email OTP after verification. */
  public clearEmailOTP() {
    this.emailOTP = null;
  }

  /** Resets the reset-password verification state. */
  public resetVerifiedPassword(): void {
    this.resetPasswordVerified = false;
  }

  /** Marks reset-password as verified. */
  public verifyResetPassword() {
    this.resetPasswordVerified = true;
  }

  /** Returns reset-password verification status. */
  public getVerifiedResetPassword(): boolean {
    return this.resetPasswordVerified;
  }

  /** Assigns an OTP for resetting password. */
  public setOTPForResetPassword(otp: OTP): void {
    this.resetPasswordOTP = otp;
  }

  /** Returns the reset-password OTP value. */
  public getOTPForResetPassword(): string | undefined | null {
    return this.resetPasswordOTP?.getValue();
  }

  /** Returns the reset-password OTP expiration date. */
  public getOTPExpiredDateForResetPassword() {
    return this.resetPasswordOTP?.getExpiresAt();
  }

  /**
   * Verifies reset-password OTP.
   * Throws if OTP missing or already verified.
   */
  public verifiedResetPasswordOTP(clientOTP: string) {
    if (this.resetPasswordVerified)
      throw new Error("reset password been verified !!");

    if (!this.resetPasswordOTP) throw new Error("no otp been reset !!");

    if (new Date() > this.resetPasswordOTP.getExpiresAt())
      throw new Error("otp expired !!");

    const verified = this.resetPasswordOTP.verfiedOtp(clientOTP);

    if (!verified) throw new Error("invalid otp !!");

    if (this.resetPasswordVerified)
      throw new Error("the user email is already verified ");

    this.resetPasswordVerified = true;
    this.clearResetPasswordOTP();
  }

  /** Clears reset password OTP after verification. */
  public clearResetPasswordOTP() {
    this.resetPasswordOTP = null;
  }

  /** Updates the user's name. */
  public updateName(userName: UserName): void {
    this.name = userName;
  }

  /** Returns the user's name. */
  public getName(): string {
    return this.name.getValue();
  }

  /** Sets user password. */
  public setPassword(userPass: string): void {
    this.password = userPass;
  }

  /** Returns user password (hashed). */
  public getPass(): string {
    return this.password;
  }

  /** Updates user date of birth. */
  public updateDateOfBirth(userDOB: UserDateOfBirth): void {
    this.dateOfBirth = userDOB;
  }

  /** Returns user date of birth. */
  public getDateOfBirth(): string {
    return this.dateOfBirth.getValue();
  }

  /** Updates user phone number. */
  public updatePhoneNumber(userPhoneNumber: userPhoneNumber): void {
    this.phoneNumber = userPhoneNumber;
  }

  /** Returns user phone number. */
  public getPhoneNumber(): string {
    return this.phoneNumber.getValue();
  }

  /** Sets user profile photo. */
  public setPhoto(photo: string): void {
    this.photo = photo;
  }

  /** Returns user profile photo URL or undefined. */
  public getPhoto(): string | undefined {
    return this.photo;
  }

  /** Sets user address. */
  public setAddress(address: string): void {
    this.address = address;
  }

  /** Returns user address or undefined. */
  public getAddress(): string | undefined {
    return this.address;
  }

  /** Sets user role. */
  public setRole(userRole: UserRole): void {
    this.role = userRole;
  }

  /** Returns user role. */
  public getRole(): UserRole {
    return this.role;
  }

  /** Updates user account status. */
  public setAccountStatus(accountStatus: UserAccountStatus): void {
    this.accountStats = accountStatus;
  }

  /** Returns account status. */
  public getAccountStatus(): UserAccountStatus {
    return this.accountStats;
  }

  /** Marks the user account as banned. */
  public bandedAccount() {
    this.accountStats = UserAccountStatus.banded;
  }

  /** Deactivates the user account. */
  public disActivatedAccount() {
    this.accountStats = UserAccountStatus.deactivate;
  }

  /** Activates the user account. */
  public activatedAccount() {
    this.accountStats = UserAccountStatus.activate;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }
}

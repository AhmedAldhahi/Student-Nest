import { AggregateRoot } from "../../../Shared/AgregateRoot/AggregateRoot";
import { UserAccountStatus } from "../Enum/UserAccountStatus.enum";
import { UserRole } from "../../../Shared/Enum/UserRole.enum";
import { UserRegisteredEvent } from "../Events/UserRegisterdEvent.event";
import { OTP } from "../Value-Object/OTP.vo";
import { UserDateOfBirth } from "../Value-Object/UserDateOfBirth.vo";
import { UserEmail } from "../Value-Object/UserEmail.vo";
import { UserName } from "../Value-Object/UserName.vo";
import { userPhoneNumber } from "../Value-Object/UserPhoneNumber.vo";
import { UserDataType } from "../types/UserDataType.type";

export class UserEntity extends AggregateRoot<string> {
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

  constructor(data: UserDataType) {
    super(data.userId);
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

  // factory method to add needed validation
  public static create(data: UserDataType) {
    const user = new UserEntity(data);

    const Email = user.getEmail();
    const Name = user.getName();
    const otpValue = user.getOtpForEmail();

    if (!Email) throw new Error("Email can not be undefined !!");
    if (!Name) throw new Error("Name can not be undefined !!");
    if (!otpValue)
      throw new Error("otp value can not during register be undenied or null");

    user.addDomainEvent(
      new UserRegisteredEvent(user.getUserId(), Email, Name, otpValue),
    );

    return user
  }

  /**
   * ==================================================================================
   *                              Email sections
   * ==================================================================================
   */

  /** Marks the user's email as unverified. */
  public resetVerifiedEmail(): void {
    this.emailVerified = false;
  }

  /** Marks the user's email as verified. */
  public verifiedEmail() {
    this.emailVerified = true;
  }

  /** Assigns an OTP for verifying the email. */
  public setOtpForEmail(otp: OTP): void {
    this.emailOTP = otp;
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

  /** Assigns an OTP for resetting password. */
  public setOTPForResetPassword(otp: OTP): void {
    this.resetPasswordOTP = otp;
  }

  /**
   * Verifies reset-password OTP.
   * Throws if OTP missing or already verified.
   */
  public verifiedResetPasswordOTP(clientOTP: string): void {
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
  public clearResetPasswordOTP(): void {
    this.resetPasswordOTP = null;
  }

  /**
   * ==================================================================================
   *                              User Profile Management
   * ==================================================================================
   */

  public updateProfile(
    name?: UserName,
    dateOfBirth?: UserDateOfBirth,
    phoneNumber?: userPhoneNumber,
    password?: string,
    photo?: string,
  ): void {
    if (name) this.changeUserName(name);
    if (dateOfBirth) this.changeDateOfBirth(dateOfBirth);
    if (phoneNumber) this.changeUserPhoneNumber(phoneNumber);
    if (password) this.changePassword(password);
    if (photo) this.setPhoto(photo);
  }

  /** Updates the user's name. */
  public changeUserName(userName: UserName): void {
    this.name = userName;
  }

  /** Sets user password. */
  public changePassword(userPass: string): void {
    this.password = userPass;
  }

  /** Updates user date of birth. */
  public changeDateOfBirth(userDOB: UserDateOfBirth): void {
    this.dateOfBirth = userDOB;
  }

  /** Updates user phone number. */
  public changeUserPhoneNumber(userPhoneNumber: userPhoneNumber): void {
    this.phoneNumber = userPhoneNumber;
  }

  /** Sets user profile photo. */
  public setPhoto(photo: string): void {
    this.photo = photo;
  }

  /** Sets user address. */
  public setAddress(address: string): void {
    this.address = address;
  }

  /** Sets user role. */
  public setRole(userRole: UserRole): void {
    this.role = userRole;
  }

  /**
   * ==================================================================================
   *                              Account Status Management
   * ==================================================================================
   */

  /** Updates user account status. */
  public setAccountStatus(accountStatus: UserAccountStatus): void {
    this.accountStats = accountStatus;
  }

  public ensureAccountIsActive(): void {
    if (this.accountStats === UserAccountStatus.deactivate)
      throw new Error("Access Denied: your account is deactivated ");

    if (this.accountStats === UserAccountStatus.banded)
      throw new Error("Access Denied: you account been banded !!");

    if (this.emailVerified === false) {
      throw new Error(
        "You have to verified you account before to go to your functionality ",
      );
    }
  }

  /** Marks the user account as banned. */
  public banAccount(): void {
    this.accountStats = UserAccountStatus.banded;
  }

  /** Deactivates the user account. */
  public deactivateAccount(): void {
    this.accountStats = UserAccountStatus.deactivate;
  }

  /** Activates the user account. */
  public activatedAccount(): void {
    this.accountStats = UserAccountStatus.activate;
  }

  /**
   * ==================================================================================
   *                              Getter Methods sections
   * ==================================================================================
   */

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  /** Returns account status. */
  public getAccountStatus(): UserAccountStatus {
    return this.accountStats;
  }

  /** Returns user role. */
  public getRole(): UserRole {
    return this.role;
  }

  /** Returns user address or undefined. */
  public getAddress(): string | undefined {
    return this.address;
  }

  /** Returns user profile photo URL or undefined. */
  public getPhoto(): string | undefined {
    return this.photo;
  }

  /** Returns user phone number. */
  public getPhoneNumber(): string | undefined {
    return this.phoneNumber.getValue() ?? undefined;
  }

  /** Returns user date of birth. */
  public getDateOfBirth(): string | undefined {
    return this.dateOfBirth.getValue() ?? undefined;
  }

  /** Returns user password (hashed). */
  public getPass(): string {
    return this.password;
  }

  /** Returns the user's name. */
  public getName(): string | undefined {
    return this.name.getValue() ?? undefined;
  }

  /** Returns the reset-password OTP expiration date. */
  public getOTPExpiredDateForResetPassword(): Date | undefined {
    return this.resetPasswordOTP?.getExpiresAt();
  }

  /** Returns the reset-password OTP value. */
  public getOTPForResetPassword(): string | undefined | null {
    return this.resetPasswordOTP?.getValue();
  }

  /** Returns reset-password verification status. */
  public getVerifiedResetPassword(): boolean {
    return this.resetPasswordVerified;
  }

  /** Gets the email OTP value. */
  public getOtpForEmail(): string | undefined | null {
    return this.emailOTP?.getValue();
  }

  /** Gets the email OTP expiration timestamp. */
  public getOtpExpiredForEmail(): Date | undefined | null {
    return this.emailOTP?.getExpiresAt();
  }

  /** Returns whether the user's email is verified. */
  public getVerifiedEmail(): boolean {
    return this.emailVerified;
  }

  /** Returns the user's ID. */
  public getUserId(): string {
    return this.userId;
  }

  /** Returns the user's email address. */
  public getEmail(): string | undefined {
    return this.email.getValue() ?? undefined;
  }
}

import { UserAccountStatus } from "../enum/UserAccountStatus.enum";
import { UserRole } from "../enum/UserRole.enum";
import { UserDateOfBirth } from "../value-object/UserDateOfBirth.vo";
import { UserEmail } from "../value-object/UserEmail.vo";
import { UserName } from "../value-object/UserName.vo";
import { userPhoneNumber } from "../value-object/UserPhoneNumber.vo";
import { OTP } from "../value-object/OTP.ValueObject";

// check data type
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

  // optional
  private address?: string;
  private photo?: string;

  // contractor
  constructor(data: IUserData) {
    this.userId = data.userId;
    this.password = data.password;
    this.name = data.name;
    this.dateOfBirth = data.dateOfBirth;
    this.phoneNumber = data.phoneNumber;
    this.email = data.email;
    this.role = data.role;
    this.address = data.address ?? undefined;
    this.photo = data.photo ?? undefined;
  }

  public setUserId(userId: string): void {
    this.userId = userId;
  }

  public getUserId(): string {
    return this.userId;
  }

  public updateEmail(userEmail: UserEmail) {
    this.email = userEmail;
  }

  public getEmail(): string {
    return this.email.getValue();
  }

  public resetVerifiedEmail(): void {
    this.emailVerified = false;
  }

  public verifiedEmail() {
    this.emailVerified = true;
  }

  public getVerifiedEmail(): boolean {
    return this.emailVerified;
  }

  public setOtpForEmail(otp: OTP): void {
    this.emailOTP = otp;
  }

  public getOtpForEmail(): string | undefined | null {
    return this.emailOTP?.getValue();
  }

  public getOtpExpiredForEmail(): Date | undefined | null {
    return this.emailOTP?.getExpiresAt();
  }

  public verifiedEmailOTP(clientOTP: string) {
    if (this.emailVerified)
      throw new Error("the user email is already verified ");
    if (!this.emailOTP) throw new Error("no otp been set !!");
    const result = this.emailOTP.verfiedOtp(clientOTP);

    this.emailVerified = result;

    this.clearEmailOTP();
  }

  private clearEmailOTP() {
    this.emailOTP = null;
  }

  public resetVerifiedPassword(): void {
    this.resetPasswordVerified = false;
  }

  public verifyResetPassword() {
    this.resetPasswordVerified = true;
  }

  public getVerifiedResetPassword(): boolean {
    return this.resetPasswordVerified;
  }

  public setOTPForResetPassword(otp: OTP): void {
    this.resetPasswordOTP = otp;
  }

  public getOTPForResetPassword(): string | undefined | null {
    return this.resetPasswordOTP?.getValue();
  }

  public getOTPExpiredDateForResetPassword() {
    return this.resetPasswordOTP?.getExpiresAt();
  }

  public verifiedResetPasswordOTP(clientOTP: string) {
    if (!this.resetPasswordOTP) throw new Error("no otp been set !!");
    const result = this.resetPasswordOTP.verfiedOtp(clientOTP);
    if (this.resetPasswordVerified)
      throw new Error("the user email is already verified ");
    this.resetPasswordVerified = result;

    this.clearResetPasswordOTP();
  }

  private clearResetPasswordOTP() {
    this.resetPasswordOTP = null;
  }

  public updateName(userName: UserName): void {
    this.name = userName;
  }

  public getName(): string {
    return this.name.getValue();
  }

  public setPassword(userPass: string): void {
    this.password = userPass;
  }

  public getPass(): string {
    return this.password;
  }

  public updateDateOfBirth(userDOB: UserDateOfBirth): void {
    this.dateOfBirth = userDOB;
  }

  public getDateOfBirth(): string {
    return this.dateOfBirth.getValue();
  }

  public updatePhoneNumber(userPhoneNumber: userPhoneNumber): void {
    this.phoneNumber = userPhoneNumber;
  }

  public getPhoneNumber(): string {
    return this.phoneNumber.getValue();
  }

  public setPhoto(photo: string): void {
    this.photo = photo;
  }

  public getPhoto(): string | undefined {
    return this.photo;
  }

  public setAddress(address: string): void {
    this.address = address;
  }

  public getAddress(): string | undefined {
    return this.address;
  }

  public setRole(userRole: UserRole): void {
    this.role = userRole;
  }

  public getRole(): UserRole {
    return this.role;
  }

  public setAccountStatus(accountStatus: UserAccountStatus): void {
    this.accountStats = accountStatus;
  }

  public getAccountStatus(): UserAccountStatus {
    return this.accountStats;
  }

  public bandedAccount() {
    this.accountStats = UserAccountStatus.banded;
  }

  public disActivatedAccount() {
    this.accountStats = UserAccountStatus.deactivate;
  }

  public activatedAccount() {
    this.accountStats = UserAccountStatus.activate;
  }
}

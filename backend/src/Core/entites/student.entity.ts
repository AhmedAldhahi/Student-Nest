import { MajorException } from "../exception/MajorException.exception";
import { UnversityException } from "../exception/UnversityException.exception";
import { currentYear } from "../../Shared/constants/validationZod.constant";
import { GraduatYearException } from "../exception/GraduateYear.exception.exception";
import { StudentCardIdException } from "../exception/StudentCardIdException.exception";
import { UserGovIdException } from "../exception/UserGovIdException.exception";
import { IStudent } from "../repositories/IStudent";
import { IUser } from "../repositories/IUser";
import { UserRole } from "../enum/UserRole.enum";
import { UserAccountStatus } from "../enum/UserAccountStatus.enum";
import { phoneNumberFormateException } from "../exception/PhonNumberException.exception";
import { NameException } from "../exception/NameException.exception";
import { EmailFormateException } from "../exception/EmailEsception.exception";
import { OTP } from "../value-object/OTP.ValueObject";

export class Student implements IStudent, IUser {
  //protected readonly userId: number;
  protected major: string;
  protected graduatYear: number;
  protected unversityName: string;
  protected studentCardId: string;
  protected student_Gov_Id: string;

  protected userId: string;
  protected hashPassword: string;

  protected email: string;
  protected emailVerfied: boolean = false;

  protected name: string;
  protected role: UserRole;
  protected dateOfBirth: Date;

  protected phoneNumber: string;
  protected photo?: string;
  protected address?: string;
  protected accountStatus: UserAccountStatus = UserAccountStatus.activate;

  protected otpCode?: string;
  protected otpExpired?: Date;

  // ...

  public setOtp(otp: OTP): void {
    this.otpCode = otp.getValue();
    this.otpExpired = otp.getExpiresAt();
  }

  // for the infrastrcture to read it
  public setOtpCode(code: string): void {
    this.otpCode = code;
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

  getUserId(): string {
    return this.userId;
  }
  setUserId(userId: string): void {
    if (!userId) throw new Error("user id is required");
    this.userId = userId;
  }

  getDateOfBirth(): Date {
    return this.dateOfBirth;
  }

  //TODO: need to check that it date of birth is 18 or hight
  public setDateOfBirth(dob: Date): void {
    if (!dob) throw new Error("date of birth is required");

    this.dateOfBirth = dob;
  }
  getPassword(): string {
    return this.hashPassword;
  }

  // Aa2 at least 8 no repeat number 1234
  setPass(userPass: string): void {
    if (!userPass) throw new Error("userPass is required");

    this.hashPassword = userPass;
  }
  getEmail(): string {
    return this.email;
  }

  setEmail(email: string): void {
    if (!email) throw new Error("email is required");

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
  }

  setName(userName: string): void {
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

  getName(): string {
    return this.name;
  }

  getRole(): UserRole {
    return this.role;
  }
  setRole(role: UserRole): void {
    role = UserRole.student;
    this.role = role;
  }
  getPhoeNumber(): string {
    return this.phoneNumber;
  }

  public setPhoneNumber(phone: string): void {
    if (!phone) throw new Error("Phone number is required");

    const trimmed = phone.trim();

    const globalPhoneRegex =
      /^(?:\+?[1-9]\d{1,14}|(?:\+9627|009627|07)([7-9][0-9]{7}))$/;

    if (!globalPhoneRegex.test(trimmed)) {
      throw new phoneNumberFormateException();
    }

    this.phoneNumber = trimmed;
  }

  getAddress(): string | undefined {
    return this.address;
  }

  setAddress(userAddress: string): void {
    this.address = userAddress;
  }

  getPhoto(): string | undefined {
    return this.photo;
  }

  setPhoto(photoUrl: string): void {
    this.photo = photoUrl;
  }

  public getVerfiedEmail(): boolean {
    return this.emailVerfied;
  }

  public setVerfiedEmail(): void {
    this.emailVerfied = true;
  }

  ActiveteAccount(): void {
    this.accountStatus = UserAccountStatus.activate;
  }

  DeactivateAccount(): void {
    this.accountStatus = UserAccountStatus.deactivate;
  }

  bandedAccount(): void {
    this.accountStatus = UserAccountStatus.banded;
  }

  public getAccountStatus(): UserAccountStatus {
    return this.accountStatus;
  }

  public setAccountStatus(status: UserAccountStatus): void {
    this.accountStatus = status;
  }

  public getMajor(): string {
    return this.major;
  }

  public getGraduateYear(): number {
    return this.graduatYear;
  }

  public getUnverstiyName(): string {
    return this.unversityName;
  }

  public getStudentCardId(): string {
    return this.studentCardId;
  }

  public setMajor(studentMajor: string): void {
    if (!studentMajor) throw new Error("studentMajor is required");

    // no number
    // no special character
    // space allow if pres space i white space between world allow
    //like computer since and technolgy
    // but not allow computer              since         and technolg
    // no underscore or any thig

    const majorPattern = /^[A-Za-z]+(?: [A-Za-z]+)*$/;

    if (!majorPattern.test(studentMajor.trim())) {
      throw new MajorException();
    }

    this.major = studentMajor.trim();
  }

  public setUnversityName(unversityName: string) {
    if (!unversityName) throw new Error("unversityName is required");

    const UnversityPattern = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
    const trimmedName = unversityName.trim();

    if (!UnversityPattern.test(trimmedName)) {
      throw new UnversityException();
    }

    // ❗️ FIX: Add this line
    this.unversityName = trimmedName;
  }

  public setGraduateYear(studentGraduateYear: number): void {
    if (!studentGraduateYear)
      throw new Error("dstudentGraduateYear is required");

    if (studentGraduateYear < currentYear) {
      throw new GraduatYearException();
    }
    if (
      studentGraduateYear > currentYear &&
      studentGraduateYear - currentYear > 8
    ) {
      throw new GraduatYearException("the user at most car graudate 8 year !!");
    }

    this.graduatYear = studentGraduateYear;
  }

  public setstudentCardId(studentCardId: string): void {
    if (!studentCardId) throw new Error("studentCardId is required");

    const trimmer = studentCardId.trim();
    if (trimmer.length < 8) {
      throw new StudentCardIdException();
    }
    this.studentCardId = trimmer;
  }

  public setStudentGovId(studentGovId: string): void {
    if (!studentGovId) throw new Error("studentGovId is required");

    const trimmer = studentGovId.trim();
    if (trimmer.length < 8) {
      throw new UserGovIdException();
    }
    this.student_Gov_Id = studentGovId;
  }

  public getStudentGovId(): string {
    return this.student_Gov_Id;
  }
}

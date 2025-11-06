import { User } from "./user.entity";
import { IStudent } from "../interfaces/IUser.interface";
import { InvalidGraduageYearException } from "../exceptions/InvalidGraudateYearException.exception";
import { InvalidUnversityNameException } from "../exceptions/InvalidUnversityName.exception";
import { UserRole } from "../enum/UserRole.enum";

export class Student extends User implements IStudent {
  private major: string;
  private graduateYear: string;
  private unversityName: string;
  private studentCardId: string;
  private walletAddress: string;
  private student_Gov_Id: string;

  //  defined later
  constructor(
    email: string,
    name: string,
    password: string,
    dateOfBirth: Date,
    phoneNumber: string,
    major: string,
    graduateYear: string,
    universityName: string,
    studentCardId: string,
    studentGovId: string,
    walletAddress?: string
  ) {
    super(email, name, password, UserRole.student, dateOfBirth, phoneNumber); 
    this.setMajor(major);
    this.setGraduateYear(graduateYear);
    this.setUnversityName(universityName);
    this.setStudentCardID(studentCardId);
    this.setStudentGovId(studentGovId);
    if (walletAddress) this.setWalletAddress(walletAddress);
  }

  public setMajor(userMajor: string): void {
    this.major = userMajor;
  }

  public getStudentMajor(): string {
    return this.major;
  }

  // need some fix for logic
  public setGraduateYear(userGraduateYear: string): void {
    if (!userGraduateYear) throw new InvalidGraduageYearException();
    this.graduateYear = userGraduateYear;
  }

  public getGraduateYear(): string {
    return this.graduateYear;
  }

  public setUnversityName(userUnversityName: string): void {
    if (!userUnversityName) throw new InvalidUnversityNameException();
    this.unversityName = userUnversityName;
  }

  public getUnversityName(): string {
    return this.unversityName;
  }

// need validation for empty 
  public setStudentCardID(userStudentCardId: string): void {
    this.studentCardId = userStudentCardId;
  }

  public getstudentCardId(): string {
    return this.studentCardId;
  }
// need validation for empty 
  public setWalletAddress(userWalletAddress: string): void {
    this.walletAddress = userWalletAddress;
  }

  public getWalletAddress(): string | undefined {
    return this.walletAddress;
  }
// need validation for empty 
  // need validation for empty 
  public setStudentGovId(userGovId: string): void {
    this.student_Gov_Id = userGovId;
  }

  public getStudent_Gov_Id(): string {
    return this.student_Gov_Id;
  }
}

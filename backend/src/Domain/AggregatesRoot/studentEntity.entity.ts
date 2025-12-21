import { UserEntity } from "../Entities/userEntity.entity";
import { StudentCard } from "../Value-Object/StudentCard.vo";
import { studentGraduateYear } from "../Value-Object/StudentGraduateYear.vo";
import { StudentMajor } from "../Value-Object/StudentMajor.vo";
import { StudentUniversity } from "../Value-Object/StudentUniversity.vo";
import { GovernmentID } from "../Value-Object/UserGovId.vo";
import { VerificationDocument } from "../Value-Object/VerficationDocument.vo";

export interface IStudentData {
  user: UserEntity;
  userGovId: GovernmentID;
  graduateYear: studentGraduateYear;
  major: StudentMajor;
  universityName: StudentUniversity;
  studentCardId: StudentCard;
  validateStudentDocument: VerificationDocument;
}

export class StudentAggregateRoot {
  private studentCardID: StudentCard;
  private userGovId: GovernmentID;
  private user: UserEntity;
  private universityName: StudentUniversity;
  private major: StudentMajor;
  private graduateYear: studentGraduateYear;
  private studentValidateDocument: VerificationDocument;
  private walletAddress: string;

  constructor(data: IStudentData) {
    this.user = data.user;
    this.studentCardID = data.studentCardId;
    this.userGovId = data.userGovId;
    this.universityName = data.universityName;
    this.graduateYear = data.graduateYear;
    this.major = data.major;
    this.studentValidateDocument = data.validateStudentDocument;
  }

  public updateStudentCardID(userCardId: StudentCard): void {
    if (!this.updateUniversityName)
      throw new Error(
        "you have to change your university before change card id "
      );
    this.studentCardID = userCardId;
  }

  //TODO: need validation
  public setWalletAddress(value: string): void {
    this.walletAddress = value;
  }

  public getWalletAddress(): string {
    return this.walletAddress;
  }

  public getStudentCardID(): string | undefined {
    return this.studentCardID.getValue() ?? undefined;
  }

  public updateUniversityName(newUniversity: StudentUniversity): void {
    this.universityName = newUniversity;
  }

  public getUniversityName(): string | undefined {
    return this.universityName.getValue() ?? undefined;
  }

  public updateMajor(major: StudentMajor): void {
    this.major = major;
  }

  public getMajor(): string | undefined {
    return this.major.getValue() ?? undefined;
  }

  public updateGraduateYear(stdGraduateYear: studentGraduateYear) {
    if (
      Number.parseInt(this.user.getDateOfBirth()!) >=
      this.graduateYear.getValue()!
    )
      throw new Error(
        "invalid date, student can not graduate before he born !!"
      );
    this.graduateYear = stdGraduateYear;
  }

  public getGraduateYear(): number | undefined {
    return this.graduateYear.getValue() ?? undefined;
  }

  public updateVerificationDocument(document: VerificationDocument) {
    this.studentValidateDocument = document;
  }

  public getVerificationDocument(): string | undefined {
    return this.studentValidateDocument.getValue() ?? undefined;
  }

  public getGovernmentId(): string | undefined {
    return this.userGovId.getValue() ?? undefined;
  }

  public getUser(): UserEntity {
    return this.user;
  }

  public getUserId(): string {
    return this.user.getUserId();
  }
}

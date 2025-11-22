import { StudentCard } from "../value-object/StudentCard.vo";
import { studentGraduateYear } from "../value-object/StudentGraduateYear.vo";
import { StudentMajor } from "../value-object/StudentMajor.vo";
import { StudentUniversity } from "../value-object/StudentUniversity.vo";
import { StudentVerificationDocument } from "../value-object/StudentVerficationDocument.vo";
import { GovernmentID } from "../value-object/UserGovId.vo";
import { UserEntity } from "./userEntity.entity";

export interface IStudentData {
  user: UserEntity;
  userGovId: GovernmentID;
  graduateYear: studentGraduateYear;
  major: StudentMajor;
  universityName: StudentUniversity;
  studentCardId: StudentCard;
  validateStudentDocument: StudentVerificationDocument;
}

export class StudentEntity {
  private studentCardID: StudentCard;
  private userGovId: GovernmentID;
  private user: UserEntity;
  private universityName: StudentUniversity;
  private major: StudentMajor;
  private graduateYear: studentGraduateYear;
  private studentValidateDocument: StudentVerificationDocument;

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

  public getStudentCardID(): string {
    return this.studentCardID.getValue();
  }

  public updateUniversityName(newUniversity: StudentUniversity): void {
    this.universityName = newUniversity;
  }

  public getUniversityName(): string {
    return this.universityName.getValue();
  }

  public updateMajor(major: StudentMajor): void {
    this.major = major;
  }

  public getMajor(): string {
    return this.major.getValue();
  }

  public updateGraduateYear(stdGraduateYear: studentGraduateYear) {
    if (
      Number.parseInt(this.user.getDateOfBirth()) >=
      this.graduateYear.getValue()
    )
      throw new Error(
        "invalid date, student can not graduate before he born !!"
      );
    this.graduateYear = stdGraduateYear;
  }

  public getGraduateYear(): number {
    return this.graduateYear.getValue();
  }

  public updateVerificationDocument(document: StudentVerificationDocument) {
    this.studentValidateDocument = document;
  }

  public getVerificationDocument(): string {
    return this.studentValidateDocument.getValue();
  }

  public getGovernmentId(): string {
    return this.userGovId.getValue();
  }

  public getUser(): UserEntity {
    return this.user;
  } 

  public getUserId(): string {
    return this.user.getUserId();
  }
}

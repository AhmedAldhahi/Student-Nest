import { StudentCard } from "../Value-Object/StudentCard.vo";
import { studentGraduateYear } from "../Value-Object/StudentGraduateYear.vo";
import { StudentMajor } from "../Value-Object/StudentMajor.vo";
import { StudentUniversity } from "../Value-Object/StudentUniversity.vo";
import { GovernmentID } from "../Value-Object/UserGovId.vo";
import { VerificationDocument } from "../Value-Object/VerficationDocument.vo";
import { StudentDataType } from "../types/StudentDataType.type";
import { AggregateRoot } from "../../../Shared/AgregateRoot/AggregateRoot";
import { RoommateProfileAggregate } from "../../RommateProfile/Aggregates/RommateProfile.aggregateRoot";

export class StudentAggregateRoot extends AggregateRoot<string> {
  private studentCardID: StudentCard;
  private userGovId: GovernmentID;
  private userId: string;
  private universityName: StudentUniversity;
  private major: StudentMajor;
  private graduateYear: studentGraduateYear;
  private studentValidateDocument: VerificationDocument;
  private roommateProfileStatus: boolean = false;
  private enableWhatsapp: boolean = true;
  //private walletAddress: string = "";

  constructor(data: StudentDataType) {
    super(data.userId);
    this.userId = data.userId;
    this.studentCardID = data.studentCardId;
    this.userGovId = data.userGovId;
    this.universityName = data.universityName;
    this.graduateYear = data.graduateYear;
    this.major = data.major;
    this.studentValidateDocument = data.validateStudentDocument;
    this.roommateProfileStatus = data.roommateProfileStatus;
    this.enableWhatsapp = data.enableWhatsapp;
    //private walletAddress: string = "";
  }

  /**
   * ==================================================================================
   *                              Behavior Methods sections
   * ==================================================================================
   */

  public markAsRoommateProfileCreated(): void {
    this.roommateProfileStatus = true;
  }

  public markAsVisibleForWhatsapp(): void {
    this.enableWhatsapp = true;
  }

  public markAsNotVisibleForWhatsapp(): void {
    this.enableWhatsapp = false;
  }

  public markAsRoommateProfileNotCreated(): void {
    this.roommateProfileStatus = false;
  }

  //todo: need fix logic before
  public changeStudentCardID(userCardId: StudentCard): void {
    if (!this.changeUniversityName)
      throw new Error(
        "you have to change your university before change card id ",
      );
    this.studentCardID = userCardId;
  }

  //TODO: need validation
  // public setWalletAddress(value: string): void {
  //   this.walletAddress = value;
  // }

  public changeUniversityName(newUniversity: StudentUniversity): void {
    this.universityName = newUniversity;
  }

  public changeMajor(major: StudentMajor): void {
    this.major = major;
  }

  public changeGraduateYear(stdGraduateYear: studentGraduateYear) {
    //TODO: need to fix this logic later
    // if (
    //   Number.parseInt(this.user.getDateOfBirth()!) >=
    //   this.graduateYear.getValue()!
    // )
    //   throw new Error(
    //     "invalid date, student can not graduate before he born !!"
    //   );
    this.graduateYear = stdGraduateYear;
  }

  public updateVerificationDocument(document: VerificationDocument) {
    this.studentValidateDocument = document;
  }

  /**
   * ==================================================================================
   *                              Getter Methods
   * ==================================================================================
   */

  public getVerificationDocument(): string | undefined {
    return this.studentValidateDocument.getValue() ?? undefined;
  }

  public getGovernmentId(): string | undefined {
    return this.userGovId.getValue() ?? undefined;
  }

  public getUserId(): string {
    return this.userId;
  }

  public getGraduateYear(): number | undefined {
    return this.graduateYear.getValue() ?? undefined;
  }

  public getStudentCardID(): string | undefined {
    return this.studentCardID.getValue() ?? undefined;
  }

  public getMajor(): string | undefined {
    return this.major.getValue() ?? undefined;
  }

  public getUniversityName(): string | undefined {
    return this.universityName.getValue() ?? undefined;
  }

  public getRoommateProfileStatus(): boolean {
    return this.roommateProfileStatus;
  }

  public getWhatsappStatus(): boolean {
    return this.enableWhatsapp;
  }

  // public getWalletAddress(): string {
  //   return this.walletAddress;
  // }
}

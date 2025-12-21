import { LandlordAggregateRoot } from "../AggregatesRoot/landloardEntity.entity";
import { StudentAggregateRoot } from "../AggregatesRoot/studentEntity.entity";
import { LeaseRequestStatus } from "../Enum/LeaseRequestStatus.enum";
import { LeaseStartDate } from "../Value-Object/LeaseStartDate.vo";
import { RentTerm } from "../Value-Object/RentTerm.vo";

export interface ILeaseRequestDate {
  requestLeaseId: number;
  requestMessage: string;
  startDate: LeaseStartDate;
  rentTerm: RentTerm;
  requestStatus: LeaseRequestStatus;
  createAt: Date;
  studentName: StudentAggregateRoot;
  landlordName: LandlordAggregateRoot;
  // apartment
  //TODO: need to add end date
}

export class LeaseRequestEntity {
  private requestLeaseId: number;
  private requestMessage: string;
  private startDate: LeaseStartDate;
  private rentTerm: RentTerm;
  private requestStatus: LeaseRequestStatus;
  private createAt: Date;
  private studentName: StudentAggregateRoot;
  private landlordName: LandlordAggregateRoot;

  constructor(data: ILeaseRequestDate) {
    this.requestLeaseId = data.requestLeaseId;
    this.requestMessage = data.requestMessage;
    this.startDate = data.startDate;
    this.rentTerm = data.rentTerm;
    this.requestStatus = data.requestStatus = LeaseRequestStatus.Pending;
    this.createAt = data.createAt;
    this.landlordName = data.landlordName;
    this.studentName = data.studentName;
  }

  public setRequestLeaseId(id: number): void {
    this.requestLeaseId = id;
  }

  public getRequestLeaseId(): number {
    return this.requestLeaseId;
  }

  public updateRequestMessage(msg: string): void {
    this.requestMessage = msg;
  }

  public getRequestMessage(): string {
    return this.requestMessage;
  }

  public updateStartDate(date: LeaseStartDate): void {
    this.startDate = date;
  }

  public getStartDate(): string | undefined {
    return this.startDate.getValue() ?? undefined;
  }

  public updateRentTerm(term: RentTerm): void {
    this.rentTerm = term;
  }

  public getRentTerm(): string | undefined {
    return this.rentTerm.getValue() ?? undefined;
  }

  public updateRequestLeaseStatus(status: LeaseRequestStatus): void {
    this.requestStatus = status;
  }

  public getRequestLeaseStatus(): LeaseRequestStatus {
    return this.requestStatus;
  }

  public markAsPending(): void {
    this.requestStatus = LeaseRequestStatus.Pending;
  }

  public markAsAccept(): void {
    this.requestStatus = LeaseRequestStatus.Accept;
  }

  public markAsReject(): void {
    this.requestStatus = LeaseRequestStatus.Reject;
  }

  public getCreateAt(): Date {
    return this.createAt;
  }

  public setLandlord(landlord: LandlordAggregateRoot): void {
    this.landlordName = landlord;
  }

  public getLandlord(): LandlordAggregateRoot {
    return this.landlordName;
  }

  public setStudent(student: StudentAggregateRoot): void {
    this.studentName = student;
  }

  public getStudent(): StudentAggregateRoot {
    return this.studentName;
  }
}

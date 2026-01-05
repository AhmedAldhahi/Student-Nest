import { LandlordAggregateRoot } from "../../Housing/AgregateRoot/landloardEntity.entity";
import { LeaseRequestStatus } from "../../../Shared/Enum/LeaseRequestStatus.enum";
import { ApartmentAggregateRoot } from "../../Housing/AgregateRoot/apartmentEntity.entity";
import { StudentAggregateRoot } from "../../Student/AgregatesRoot/studentEntity.entity";
import { LeaseStartDate } from "../Value-Object/LeaseStartDate.vo";
import { RentTerm } from "../Value-Object/RentTerm.vo";

export interface ILeaseRequestDate {
  requestLeaseId: string;
  requestMessage: string;
  startDate: LeaseStartDate;
  rentTerm: RentTerm;
  requestStatus: LeaseRequestStatus;
  createAt: Date;
  studentName: string;
  landlordName: string;

  // apartment fk need to add
  apartment: string;
}

export class LeaseRequestEntity {
  private requestLeaseId: string;
  private requestMessage: string;
  private startDate: LeaseStartDate;
  private rentTerm: RentTerm;
  private requestStatus: LeaseRequestStatus;
  private createAt: Date;

  private studentName: string;
  private landlordName: string;
  private apartment: string;

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

  public getRequestLeaseId(): string {
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

  public getLandlord(): string {
    return this.landlordName;
  }

  public getStudent(): string {
    return this.studentName;
  }

  public getApartment(): string {
    return this.apartment;
  }
}

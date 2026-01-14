import { LeaseRequestStatus } from "../Enum/LeaseRequestStatus.enum";
import { LeaseStartDate } from "../Value-Object/LeaseStartDate.vo";
import { RentTerm } from "../Value-Object/RentTerm.vo";

export interface ILeaseRequestDate {
  requestLeaseId: string;
  requestMessage: string;
  startDate: LeaseStartDate;
  rentTerm: RentTerm;
  requestStatus: LeaseRequestStatus;
  createAt: Date;

  studentId: string;
  landlordId: string;
  apartmentId: string;
}

export class LeaseRequestEntity {
  private requestLeaseId: string;
  private requestMessage: string;
  private startDate: LeaseStartDate;
  private rentTerm: RentTerm;
  private requestStatus: LeaseRequestStatus;
  private createAt: Date;

  private studentId: string;
  private landlordId: string;
  private apartmentId: string;

  constructor(data: ILeaseRequestDate) {
    this.requestLeaseId = data.requestLeaseId;
    this.requestMessage = data.requestMessage;
    this.startDate = data.startDate;
    this.rentTerm = data.rentTerm;
    this.requestStatus = data.requestStatus = LeaseRequestStatus.Pending;
    this.createAt = data.createAt;
    this.landlordId = data.landlordId;
    this.apartmentId = data.apartmentId;
    this.studentId = data.studentId;
  }

  /**
   * ==================================================================================
   *                              Getter Methods sections
   * ==================================================================================
   */

  public getRequestLeaseId(): string {
    return this.requestLeaseId;
  }

  public getRequestMessage(): string {
    return this.requestMessage;
  }

  public getStartDate(): string | undefined {
    return this.startDate.getValue() ?? undefined;
  }

  public getRequestLeaseStatus(): LeaseRequestStatus {
    return this.requestStatus;
  }
  public getRentTerm(): string | undefined {
    return this.rentTerm.getValue() ?? undefined;
  }

  public getCreateAt(): Date {
    return this.createAt;
  }

  public getLandlord(): string {
    return this.landlordId;
  }

  public getStudent(): string {
    return this.studentId;
  }

  public getApartment(): string {
    return this.apartmentId;
  }

  /**
   * ==================================================================================
   *                              Behavior  Methods
   * ==================================================================================
   */

  public pending(): void {
    this.requestStatus = LeaseRequestStatus.Pending;
  }

  public accept(): void {
    this.requestStatus = LeaseRequestStatus.Accept;
  }

  public reject(): void {
    this.requestStatus = LeaseRequestStatus.Reject;
  }

  /**
   * ==================================================================================
   *                              Setter  Methods
   * ==================================================================================
   */

  public updateRequestMessage(msg: string): void {
    this.requestMessage = msg;
  }

  public updateStartDate(date: LeaseStartDate): void {
    this.startDate = date;
  }

  public updateRentTerm(term: RentTerm): void {
    this.rentTerm = term;
  }
}

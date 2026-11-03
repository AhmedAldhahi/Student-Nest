import { AggregateRoot } from "../../../Shared/AgregateRoot/AggregateRoot";
import { LeaseRequestStatus } from "../Enum/LeaseRequestStatus.enum";
import { LeaseRequestDate } from "../types/LeaseRequestData";
import { LeaseStartDate } from "../Value-Object/LeaseStartDate.vo";
import { RentTerm } from "../Value-Object/RentTerm.vo";

export class LeaseRequestEntity {
  private requestLeaseId: string;
  private requestMessage: string;
  private startDate: LeaseStartDate;
  private rentTerm: RentTerm;
  private requestStatus: LeaseRequestStatus = LeaseRequestStatus.Pending;
  private createAt: Date;

  private studentId: string;
  private landlordId: string;
  private apartmentId: string;

  constructor(data: LeaseRequestDate) {
    this.requestLeaseId = data.requestLeaseId;
    this.requestMessage = data.requestMessage;
    this.startDate = data.startDate;
    this.rentTerm = data.rentTerm;
    this.requestStatus = data.requestStatus;
    this.createAt = data.createAt;
    this.landlordId = data.landlordId;
    this.apartmentId = data.apartmentId;
    this.studentId = data.studentId;
  }

  public static create(data: LeaseRequestDate) {
    const leaseRequest = new LeaseRequestEntity(data);

    if (!leaseRequest.getRequestMessage()) {
      throw new Error("lease request message is require !!");
    }

    if (!leaseRequest.getApartment()) {
      throw new Error("can not send lease request for unknown apartments !!");
    }
    return leaseRequest;
  }

  /**
   * ==================================================================================
   *                              Behavior Methods
   * ==================================================================================
   */

  public isLeaseRequestExpired(): boolean {
    const expirationDate = new Date(this.createAt);

    expirationDate.setDate(expirationDate.getDate() + 3);

    const now = new Date();

    return now > expirationDate;
  }

  public updateLeaseRequestStatus(status: LeaseRequestStatus): void {
    if (status === LeaseRequestStatus.Accept) {
      this.accept();
    }

    if (status === LeaseRequestStatus.Reject) {
      this.reject();
    }
  }

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

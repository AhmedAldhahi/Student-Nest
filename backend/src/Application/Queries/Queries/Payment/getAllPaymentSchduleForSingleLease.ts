import { IQueries } from "../../IQueries";

export class GetAllPaymentScheduleForSingleLeaseQueries implements IQueries {
  public userId: string;
  public leaseId: string;
  public apartmentId:string;

  constructor(userId: string, leaseId: string, apartmentId:string) {
    this.userId = userId;
    this.leaseId = leaseId;
    this.apartmentId = apartmentId;
  }
}

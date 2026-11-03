import { IQueries } from "../../Shared/abstraction/IQueries";

export class GetAllPaymentScheduleForSingleLeaseQueries implements IQueries {
  public userId: string;
  public leaseId: string;

  constructor(userId: string, leaseId: string) {
    this.userId = userId;
    this.leaseId = leaseId;
  }
}

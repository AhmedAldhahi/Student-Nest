import { IQueries } from "../../Shared/abstraction/IQueries";

export class GetReceiptForOnePaymentQueries implements IQueries {
  public userId: string;
  public paymentId: string;
  public leaseId: string;

  constructor(userId: string, paymentId: string, leaseId: string) {
    this.userId = userId;
    this.paymentId = paymentId;
    this.leaseId = leaseId;
  }
}

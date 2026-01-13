import { IPaymentStrategy } from "./IPayment.strategy";

export class StudentPaymentStrategy implements IPaymentStrategy {
    
  constructor() {}

  public async FindAllPaymentHistoryForLeaseThatPaid(
    userId: string,
    leaseId: string
  ): Promise<any> {
    throw new Error("Method not implemented.");
  }
}

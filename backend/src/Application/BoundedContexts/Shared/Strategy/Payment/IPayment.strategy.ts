export interface IPaymentStrategy {
  FindAllPaymentHistoryForLeaseThatPaid(
    userId: string,
    leaseId: string,
  ): Promise<any>;

  GetAllPaymentScheduleForSingleLeases(
    userId: string,
    leaseId: string,
  ): Promise<any>;

  GetReceiptForSinglePayment(
    userId: string,
    leaseId: string,
    paymentId: string,
  ): Promise<any>;
}

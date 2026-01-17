export interface IPaymentStrategy {
  FindAllPaymentHistoryForLeaseThatPaid(
    userId: string,
    leaseId: string
  ): Promise<any>;

  FindAllPaymentScheduleForSingleLease(
    userId: string,
    leaseId: string
  ): Promise<any>;
}

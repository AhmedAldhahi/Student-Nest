export interface IPaymentStrategy {
  FindAllPaymentHistoryForLeaseThatPaid(
    userId: string,
    leaseId: string,
  ): Promise<any>;

  GetAllPaymentScheduleForSingleLeases(
    userId: string,
    leaseId: string,
  ): Promise<any>;
}

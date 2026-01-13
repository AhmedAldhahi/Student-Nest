import { IReadUserRepositories } from "../../../../Domain/Modules/Identity/Repositories/ReadUserRepositories.repositories";
import { IReadPaymentScheduleRepo } from "../../../../Domain/Modules/Payment/Repositories/ReadPaymentSchedualRepo.repostiores";
import { IQueriesHandlers } from "../../IQueriesHandlers";
import { FindAllPaymentHistoryForLeaseThatPaidQueries } from "../../Queries/Payment/FindAllPaymentHistoryForLeaseThatPaidForLandlord";
import { PaymentStatus } from "../../../../Domain/Shared/Enum/PaymentStatus.enum";

export class FindAllPaymentHistoryForLandlordQueriesHandler
  implements IQueriesHandlers<FindAllPaymentHistoryForLeaseThatPaidQueries>
{
  constructor(
    private readonly readUserRepo: IReadUserRepositories,
    private readonly readPaymentRepo: IReadPaymentScheduleRepo
  ) {}

  public async handle(
    query: FindAllPaymentHistoryForLeaseThatPaidQueries
  ): Promise<any> {
    try {
      // 1. Validate User
      const user = await this.readUserRepo.findById(query.userId);
      if (!user) throw new Error("User not found!");
      user.ensureAccountIsActive();

      // 2. Fetch ALL payments for this lease
      const allPayments =
        await this.readPaymentRepo.FindAllPaymentScheduleForOneLease(
          query.userId,
          query.leaseId
        );

      if (!allPayments || allPayments.length === 0) {
        return [];
      }

      const paidPaymentIds = allPayments
        .filter((p) => p.paymentStatus === PaymentStatus.Paid)
        .map((p) => p.paymentId);

      if (paidPaymentIds.length === 0) {
        return [];
      }

      const result = await this.readPaymentRepo.FindAllPaymentAsArray(
        query.userId,
        query.leaseId,
        paidPaymentIds
      );

      return result;
    } catch (error: any) {
      console.error("Error fetching payment history:", error);
      throw new Error(error.message || "Failed to fetch payment history.");
    }
  }
}

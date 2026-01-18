import { FindAllPaymentHistoryForLeaseThatPaidQueries } from "../../../Payment/Queries/FindAllPaymentHistoryForLeaseThatPaidForLandlord";
import { GetAllPaymentScheduleForSingleLeaseQueries } from "../../../Payment/Queries/getAllPaymentSchduleForSingleLease";
import { GetReceiptForOnePaymentQueries } from "../../../Payment/Queries/GetReceiptForOnePayment";
import { FindAllPaymentHistoryForStudentQueriesHandler } from "../../../Payment/QueriesHandler/FindAllPaymentHistoryForStudentQueriesHandler";
import { GetAllPaymentScheduleForSingleLeasesQueriesHandlerForStudent } from "../../../Payment/QueriesHandler/GetAllPaymentScheduleForSignleLeaseForStudentQuereisHandler";
import { GetReceiptForSinglePaymentForStudentQueriesHandler } from "../../../Payment/QueriesHandler/GetReceiptForSinglePaymentforStudentQueriesHandler";
import { IPaymentStrategy } from "./IPayment.strategy";

export class StudentPaymentStrategy implements IPaymentStrategy {
  constructor(
    private readonly FindAllPaymentHistoryThatPaid: FindAllPaymentHistoryForStudentQueriesHandler,
    private readonly GetPaymentSchedulerSingleLeaseForStudentQH: GetAllPaymentScheduleForSingleLeasesQueriesHandlerForStudent,
    private readonly GetReceiptForSinglePaymentForStudentQH: GetReceiptForSinglePaymentForStudentQueriesHandler,
  ) {}

  public async GetReceiptForSinglePayment(
    userId: string,
    leaseId: string,
    paymentId: string,
  ): Promise<any> {
    try {
      const queries = new GetReceiptForOnePaymentQueries(
        userId,
        paymentId,
        leaseId,
      );
      return await this.GetReceiptForSinglePaymentForStudentQH.handle(queries);
    } catch (error: any) {
      console.error("fail to get receipt for payments ", error);
      throw error;
    }
  }

  public async GetAllPaymentScheduleForSingleLeases(
    userId: string,
    leaseId: string,
  ): Promise<any> {
    try {
      const queries = new GetAllPaymentScheduleForSingleLeaseQueries(
        userId,
        leaseId,
      );
      return await this.GetPaymentSchedulerSingleLeaseForStudentQH.handle(
        queries,
      );
    } catch (error: any) {
      console.error("fail to fetch paid payment !!");
      throw error;
    }
  }

  public async FindAllPaymentHistoryForLeaseThatPaid(
    userId: string,
    leaseId: string,
  ): Promise<any> {
    try {
      const queries = new FindAllPaymentHistoryForLeaseThatPaidQueries(
        userId,
        leaseId,
      );
      return await this.FindAllPaymentHistoryThatPaid.handle(queries);
    } catch (error: any) {
      console.error("fail to fetch paid payment !!");
      throw error;
    }
  }
}

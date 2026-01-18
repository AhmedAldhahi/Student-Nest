import { FindAllPaymentHistoryForLeaseThatPaidQueries } from "../../../Payment/Queries/FindAllPaymentHistoryForLeaseThatPaidForLandlord";
import { GetAllPaymentScheduleForSingleLeaseQueries } from "../../../Payment/Queries/getAllPaymentSchduleForSingleLease";
import { FindAllPaymentHistoryForLandlordQueriesHandler } from "../../../Payment/QueriesHandler/FindAllPaymentHistoryForLandlordForSingleLease";
import { GetAllPaymentScheduleForSingleLeasesQueriesHandler } from "../../../Payment/QueriesHandler/GetAllPaymentScheduleForSingleLeasesQueriesHandler";
import { IPaymentStrategy } from "./IPayment.strategy";

export class LandlordPaymentStrategy implements IPaymentStrategy {
  constructor(
    private readonly FindAllPaymentHistoryThatPaid: FindAllPaymentHistoryForLandlordQueriesHandler,
    private readonly GetAllPaymentScheduleForSingleLeasesQH: GetAllPaymentScheduleForSingleLeasesQueriesHandler,
  ) {}

  public async GetAllPaymentScheduleForSingleLeases(
    userId: string,
    leaseId: string,
  ): Promise<any> {
    try {
      const queries = new GetAllPaymentScheduleForSingleLeaseQueries(
        userId,
        leaseId,
      );
      return await this.GetAllPaymentScheduleForSingleLeasesQH.handle(queries);
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

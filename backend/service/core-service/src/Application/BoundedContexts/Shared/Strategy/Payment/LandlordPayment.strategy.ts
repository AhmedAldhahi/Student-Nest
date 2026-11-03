import { FindAllPaymentHistoryForLeaseThatPaidQueries } from "../../../Payment/Queries/FindAllPaymentHistoryForLeaseThatPaidForLandlord";
import { GetAllPaymentScheduleForSingleLeaseQueries } from "../../../Payment/Queries/getAllPaymentSchduleForSingleLease";
import { GetReceiptForOnePaymentQueries } from "../../../Payment/Queries/GetReceiptForOnePayment";
import { FindAllPaymentHistoryForLandlordQueriesHandler } from "../../../Payment/QueriesHandler/FindAllPaymentHistoryForLandlordForSingleLease";
import { GetAllPaymentScheduleForSingleLeasesQueriesHandler } from "../../../Payment/QueriesHandler/GetAllPaymentScheduleForSingleLeasesQueriesHandler";
import { GetReceiptForSinglePaymentQueriesHandler } from "../../../Payment/QueriesHandler/GetReceiptForSinglePaymentQueriesHandler";
import { IPaymentStrategy } from "./IPayment.strategy";

export class LandlordPaymentStrategy implements IPaymentStrategy {
  constructor(
    private readonly FindAllPaymentHistoryThatPaid: FindAllPaymentHistoryForLandlordQueriesHandler,
    private readonly GetAllPaymentScheduleForSingleLeasesQH: GetAllPaymentScheduleForSingleLeasesQueriesHandler,
    private readonly GetReceiptGetReceiptForSinglePaymentQH: GetReceiptForSinglePaymentQueriesHandler,
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
      return await this.GetReceiptGetReceiptForSinglePaymentQH.handle(queries);
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

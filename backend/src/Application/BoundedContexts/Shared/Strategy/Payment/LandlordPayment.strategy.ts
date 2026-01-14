
import { FindAllPaymentHistoryForLeaseThatPaidQueries } from "../../../Payment/Queries/FindAllPaymentHistoryForLeaseThatPaidForLandlord";
import { FindAllPaymentHistoryForLandlordQueriesHandler } from "../../../Payment/QueriesHandler/FindAllPaymentHistoryForLandlordForSingleLease";
import { IPaymentStrategy } from "./IPayment.strategy";

export class LandlordPaymentStrategy implements IPaymentStrategy {
  constructor(
    private readonly FindAllPaymentHistoryThatPaid: FindAllPaymentHistoryForLandlordQueriesHandler
  ) {}

  public async FindAllPaymentHistoryForLeaseThatPaid(
    userId: string,
    leaseId: string
  ): Promise<any> {
    try {
      const queries = new FindAllPaymentHistoryForLeaseThatPaidQueries(userId,leaseId);
      return await this.FindAllPaymentHistoryThatPaid.handle(queries);

    } catch(error: any) {
      console.error("fail to fetch paid payment !!");
      throw error;
    }
  }
}

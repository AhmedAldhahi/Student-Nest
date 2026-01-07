import { GetReceiptForSinglePaymentQueriesHandler } from "../../../Queries/Handlers/Payment/GetReceiptForSinglePaymentQueriesHandler";
import { GetReceiptForOnePaymentQueries } from "../../../Queries/Queries/Payment/GetReceiptForOnePayment";

export class GetReceiptForOnePaymentUseCase {
  constructor(private readonly QH: GetReceiptForSinglePaymentQueriesHandler) {}

  public async execute(userId: string, paymentId: string, leaseId: string) {
    try {
      const queries = new GetReceiptForOnePaymentQueries(
        userId,
        paymentId,
        leaseId
      );

      return await this.QH.handle(queries);
    } catch (error: any) {
      console.error("fail to get receipt !!");
      throw error;
    }
  }
}

import { GetAllPaymentScheduleForSingleLeasesQueriesHandler } from "../../../Queries/Handlers/Payment/GetAllPaymentScheduleForSingleLeasesQueriesHandler";
import { GetAllPaymentScheduleForSingleLeaseQueries } from "../../../Queries/Queries/Payment/getAllPaymentSchduleForSingleLease";

export class GetAllPaymentScheduleForSingleLeaseUseCase {
  constructor(
    private readonly QH: GetAllPaymentScheduleForSingleLeasesQueriesHandler
  ) {}

  public async execute(userId: string, leaseId: string) {
    try {
      const queries = new GetAllPaymentScheduleForSingleLeaseQueries(
        userId,
        leaseId
      );

      return await this.QH.handle(queries);
    } catch (error: any) {
      console.error("fail to get payment schedule !!");
      throw error;
    }
  }
}

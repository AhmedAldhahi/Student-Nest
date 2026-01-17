import { GetAllPaymentScheduleForSingleLeaseQueries } from "../../../Payment/Queries/getAllPaymentSchduleForSingleLease";
import { GetAllPaymentScheduleForSingleLeasesForStudentQueriesHandler } from "../../../Payment/QueriesHandler/GetAllPaymentScheduleForStudentQueriesHandler";
import { IPaymentStrategy } from "./IPayment.strategy";

export class StudentPaymentStrategy implements IPaymentStrategy {
  constructor(
    private readonly getAllPaymentForSingleLeaseQH: GetAllPaymentScheduleForSingleLeasesForStudentQueriesHandler
  ) {}

  public async FindAllPaymentScheduleForSingleLease(
    userId: string,
    leaseId: string
  ): Promise<any> {
    try {
      const queries = new GetAllPaymentScheduleForSingleLeaseQueries(
        userId,
        leaseId
      );
      return await this.getAllPaymentForSingleLeaseQH.handle(queries);
    } catch (error: any) {
      console.error("fail to get all payment schedule for this student", error);
      throw error;
    }
  }

  public async FindAllPaymentHistoryForLeaseThatPaid(
    userId: string,
    leaseId: string
  ): Promise<any> {
    throw new Error("Method not implemented.");
  }
}

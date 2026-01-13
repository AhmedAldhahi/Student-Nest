import { IReadUserRepositories } from "../../../../Domain/Modules/Identity/Repositories/ReadUserRepositories.repositories";
import { IReadPaymentScheduleRepo } from "../../../../Domain/Modules/Payment/Repositories/ReadPaymentSchedualRepo.repostiores";
import { IQueriesHandlers } from "../../IQueriesHandlers";
import { GetAllPaymentScheduleForSingleLeaseQueries } from "../../Queries/Payment/getAllPaymentSchduleForSingleLease";

export class GetAllPaymentScheduleForSingleLeasesQueriesHandler
  implements IQueriesHandlers<GetAllPaymentScheduleForSingleLeaseQueries>
{
  constructor(
    private readonly readUserRepo: IReadUserRepositories,
    private readonly readPaymentScheduleRepo: IReadPaymentScheduleRepo
  ) {}
  public async handle(
    command: GetAllPaymentScheduleForSingleLeaseQueries
  ): Promise<any> {
    try {
      const user = await this.readUserRepo.findById(command.userId);

      if (!user) throw new Error("no user been found !!");
      user.ensureAccountIsActive();

      return await this.readPaymentScheduleRepo.FindAllPaymentScheduleForOneLease(
        command.userId,
        command.leaseId
      );
    } catch (error: any) {
      console.error("fail to get payment Schedule ");
      throw error;
    }
  }
}

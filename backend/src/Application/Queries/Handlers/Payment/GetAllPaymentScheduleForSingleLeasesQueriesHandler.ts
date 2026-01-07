import { IReadUserRepositories } from "../../../../Domain/Modules/Identity/Repositories/ReadUserRepositories.repositories";
import { IReadLeaseRepositories } from "../../../../Domain/Modules/Leases/Repositories/Read/ReadLeaseRepositories.repositories";
import { IReadPaymentScheduleRepo } from "../../../../Domain/Modules/Payment/Repositories/ReadPaymentSchedualRepo.repostiores";
import { IQueriesHandlers } from "../../IQueriesHandlers";
import { GetAllPaymentScheduleForSingleLeaseQueries } from "../../Queries/Payment/getAllPaymentSchduleForSingleLease";

export class GetAllPaymentScheduleForSingleLeasesQueriesHandler
  implements IQueriesHandlers<GetAllPaymentScheduleForSingleLeaseQueries>
{
  constructor(
    private readonly readUserRepo: IReadUserRepositories,
    private readonly readLeaseRepo: IReadLeaseRepositories,
    private readonly readPaymentScheduleRepo: IReadPaymentScheduleRepo
  ) {}
  public async handle(
    command: GetAllPaymentScheduleForSingleLeaseQueries
  ): Promise<any> {
    try {
      const user = await this.readUserRepo.findById(command.userId);

      if (!user) throw new Error("no user been found !!");
      user.ensureAccountIsActive();

      const lease =
        await this.readLeaseRepo.findLeaseForLandlordForSingleApartmentById(
          command.userId,
          command.apartmentId,
          command.leaseId
        );

      if (!lease) throw new Error("no lease been found !!");

      return await this.readPaymentScheduleRepo.FindAllPaymentScheduleForOneLease(
        command.userId,
        lease.getLeaseId()
      );
    } catch (error: any) {
      console.error("fail to get payment Schedule ");
      throw error;
    }
  }
}

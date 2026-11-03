import { IReadUserRepositories } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadUserRepositories.repositories";
import { IReadLeaseRepositories } from "../../../../Domain/BoundedContexts/Leases/Repositories/Read/ReadLeaseRepositories.repositories";
import { IReadReceiptPaymentRepo } from "../../../../Domain/BoundedContexts/Payment/Repositories/ReadReceiptPaymentRepo.Repositories";
import { IQueriesHandlers } from "../../Shared/abstraction/IQueriesHandler";
import { GetReceiptForOnePaymentQueries } from "../Queries/GetReceiptForOnePayment";

export class GetReceiptForSinglePaymentForStudentQueriesHandler implements IQueriesHandlers<GetReceiptForOnePaymentQueries> {
  constructor(
    private readonly readUserRepo: IReadUserRepositories,
    private readonly readLeaseRepo: IReadLeaseRepositories,
    private readonly readReceiptRepo: IReadReceiptPaymentRepo,
  ) {}

  public async handle(command: GetReceiptForOnePaymentQueries): Promise<any> {
    try {
      const user = await this.readUserRepo.findById(command.userId);
      if (!user) throw new Error("no user been found !!");

      user.ensureAccountIsActive();

      const lease = await this.readLeaseRepo.findLeaseForStudentById(
        command.userId,
        command.leaseId,
      );

      if (!lease) throw new Error("no lease found !!");

      return await this.readReceiptRepo.findReceiptForPaymentScheduleByIdForStudent(
        command.userId,
        command.paymentId,
      );
    } catch (error: any) {
      console.error("fail to get receipt for this payments !!", error);
      throw error;
    }
  }
}

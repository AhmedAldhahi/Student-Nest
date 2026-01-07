import { IReadLandlordRepositories } from "../../../../Domain/Modules/Housing/Repositories/Read/ReadLandlordRepositories.repositoreies";
import { IReadUserRepositories } from "../../../../Domain/Modules/Identity/Repositories/ReadUserRepositories.repositories";
import { IReadLeaseRepositories } from "../../../../Domain/Modules/Leases/Repositories/Read/ReadLeaseRepositories.repositories";
import { IReadPaymentScheduleRepo } from "../../../../Domain/Modules/Payment/Repositories/ReadPaymentSchedualRepo.repostiores";
import { IUnitOfWork } from "../../../../Domain/Shared/Repositories/UnitOfWorkRepositories.repositories";
import { EditStatusOfPaymentCommand } from "../../Commands/Payment/EditStatusOfPaymentCommand";
import { ICommandHandlers } from "../../ICommandHandlers";

export class EditStatusOfPaymentCommandHandler
  implements ICommandHandlers<EditStatusOfPaymentCommand>
{
  constructor(
    private readonly uow: IUnitOfWork,
    private readonly readUserRepo: IReadUserRepositories,
    private readonly readLandlordRepo: IReadLandlordRepositories,
    private readonly readPaymentScheduleRepo: IReadPaymentScheduleRepo,
    private readonly readLeaseRepo: IReadLeaseRepositories
  ) {}

  public async handle(command: EditStatusOfPaymentCommand): Promise<any> { 
    try {
      const user = await this.readUserRepo.findById(command.userId);
      if (!user) throw new Error("no user been found !!");

      const landlord = await this.readLandlordRepo.findLandlordById(command.userId);
      if (!landlord) throw new Error("no landlord been found !!");

      const lease = await this.readLeaseRepo.findLeaseForLandlordById(
        command.userId,
        command.leaseId
      );

      if (!lease) throw new Error("no lease been found !!");

      const paymentSchedule =
        await this.readPaymentScheduleRepo.FindPaymentScheduleById(
          command.userId,
          command.leaseId,
          command.paymentId
        );

      if (!paymentSchedule)
        throw new Error("no payment schedule been founds !!");

      landlord.updatePaymentScheduleStatus(paymentSchedule,command.status)

      await this.uow.startTransaction();
      await this.uow.writePaymentScheduleRepo.updatePaymentSchedule(
        paymentSchedule
      );
      await this.uow.commitTransaction();
    } catch (error: any) {
      await this.uow.rollbackTransaction();
      console.error("fail to update payment schedule status !!", error);

      throw error;
    } finally {
      await this.uow.releaseTransaction();
    }
  }
}

import { IReadUserRepositories } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadUserRepositories.repositories";
import { ReceiptEntity } from "../../../../Domain/BoundedContexts/Payment/Entities/ReceiptEntities.entity";
import { VerifiedLandlordStatus } from "../../../../Domain/BoundedContexts/Payment/Enum/VerfiedLandlordStatus.enum";
import { IReadPaymentScheduleRepo } from "../../../../Domain/BoundedContexts/Payment/Repositories/ReadPaymentSchedualRepo.repostiores";
import { IUnitOfWork } from "../../../../Domain/Shared/Repositories/UnitOfWorkRepositories.repositories";
import { IFileStorageService } from "../../../Interfaces/IFileStorage.interface";
import { ICommandHandlers } from "../../Shared/abstraction/ICommandHandler";
import { AddNewReceiptCommand } from "../Command/AddNewReceptCPaymentCommand";
import { v4 as uuidv4 } from "uuid";

//todo need to add event bus for notifications !!

export class AddNewPaymentReceiptForPaymentCommandHandler implements ICommandHandlers<AddNewReceiptCommand> {
  constructor(
    private readonly readUserRepo: IReadUserRepositories,
    private readonly readPaymentRepo: IReadPaymentScheduleRepo,
    private readonly fileService: IFileStorageService,
    private readonly uow: IUnitOfWork,
  ) {}

  public async handle(command: AddNewReceiptCommand): Promise<any> {
    try {
      const user = await this.readUserRepo.findById(command.userId);
      if (!user) throw new Error("no user been found !!");

      user.ensureAccountIsActive();

      const payments =
        await this.readPaymentRepo.FindPaymentScheduleByIdForStudent(
          command.userId,
          command.leaseId,
          command.paymentId,
        );

      if (!payments)
        throw new Error(
          `no payment schedule been found for this lease ${command.leaseId}`,
        );

      const file = await this.fileService.upload(command.documentUrl);

      const receiptId = uuidv4();
      const NewReceipt = new ReceiptEntity({
        verifiedByLandlord: VerifiedLandlordStatus.Pending,
        createAt: new Date(),
        scheduleId: command.paymentId,
        receiptId: receiptId,
        ReceiptUrl: file,
      });

      payments.uploadReceipt(NewReceipt);
      await this.uow.startTransaction();
      await this.uow.writePaymentScheduleRepo.updatePaymentSchedule(payments);
      await this.uow.commitTransaction();
    } catch (error: any) {
      await this.uow.rollbackTransaction();
      console.error("fail to add apartment receipt !!", error);
    } finally {
      await this.uow.releaseTransaction();
    }
  }
}

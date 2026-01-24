import { IReadLandlordRepositories } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadLandlordRepositories.repositoreies";
import { IReadUserRepositories } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadUserRepositories.repositories";
import { IReadLeaseRepositories } from "../../../../Domain/BoundedContexts/Leases/Repositories/Read/ReadLeaseRepositories.repositories";
import { IReadPaymentScheduleRepo } from "../../../../Domain/BoundedContexts/Payment/Repositories/ReadPaymentSchedualRepo.repostiores";
import { IReadReceiptPaymentRepo } from "../../../../Domain/BoundedContexts/Payment/Repositories/ReadReceiptPaymentRepo.Repositories";
import { IUnitOfWork } from "../../../../Domain/Shared/Repositories/UnitOfWorkRepositories.repositories";
import { ICommandHandlers } from "../../Shared/abstraction/ICommandHandler";
import { ChangeStatusOfPaymentCommand } from "../Command/ChangeStatusOfPaymentCommand";
import { PaymentStatusResponse } from "../Dto/Respone/PaymentStatusResponse";

export class ChangeStatusOfPaymentCommandHandler implements ICommandHandlers<ChangeStatusOfPaymentCommand> {
  constructor(
    private readonly uow: IUnitOfWork,
    private readonly readUserRepo: IReadUserRepositories,
    private readonly readLandlordRepo: IReadLandlordRepositories,
    private readonly readPaymentScheduleRepo: IReadPaymentScheduleRepo,
    private readonly readLeaseRepo: IReadLeaseRepositories,
    private readonly readReceiptRepo: IReadReceiptPaymentRepo,
  ) {}

  public async handle(
    command: ChangeStatusOfPaymentCommand,
  ): Promise<PaymentStatusResponse> {
    try {
      const user = await this.readUserRepo.findById(command.userId);
      if (!user) throw new Error("User not found!");
      user.ensureAccountIsActive();

      const landlord = await this.readLandlordRepo.findLandlordById(
        command.userId,
      );
      if (!landlord) throw new Error("Landlord profile not found!");

      // 2. Validate Lease Ownership
      const lease = await this.readLeaseRepo.findLeaseForLandlordById(
        command.userId,
        command.leaseId,
      );
      if (!lease) throw new Error("Lease not found or access denied!");

      // 3. Get the Payment Schedule
      const paymentSchedule =
        await this.readPaymentScheduleRepo.FindPaymentScheduleById(
          command.userId,
          command.leaseId,
          command.paymentId,
        );

      if (!paymentSchedule) throw new Error("Payment schedule not found!");

      const receipts =
        await this.readReceiptRepo.findAllReceiptForPaymentScheduleById(
          command.userId,
          command.paymentId,
        );

      if (!receipts || receipts.length === 0) {
        throw new Error("No receipt found for this payment to verify!");
      }

      const receipt = receipts[0];

      landlord.updatePaymentScheduleStatus(
        paymentSchedule,
        receipt,
        command.status,
      );

      await this.uow.startTransaction();

      await this.uow.writePaymentScheduleRepo.updatePaymentSchedule(
        paymentSchedule,
      );

      await this.uow.writePaymentReceiptRepo.updateReceipt(receipt);

      await this.uow.commitTransaction();

      return {
        message: "payment status update successfully ",
      };
    } catch (error: any) {
      await this.uow.rollbackTransaction();
      console.error("Fail to update payment schedule status:", error);
      throw error;
    } finally {
      await this.uow.releaseTransaction();
    }
  }
}

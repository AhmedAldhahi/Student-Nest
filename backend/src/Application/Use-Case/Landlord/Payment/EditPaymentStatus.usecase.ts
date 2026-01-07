import { PaymentStatus } from "../../../../Domain/Shared/Enum/PaymentStatus.enum";
import { EditStatusOfPaymentCommand } from "../../../Command/Commands/Payment/EditStatusOfPaymentCommand";
import { EditStatusOfPaymentCommandHandler } from "../../../Command/Handlers/Payment/EditStatusOfPaymentCommandHandler";

export class EditPaymentStatusUseCase {
  constructor(private readonly CH: EditStatusOfPaymentCommandHandler) {}

  public async execute(
    userId: string,
    leaseId: string,
    paymentId: string,
    status: PaymentStatus
  ) {
    try {
      const command = new EditStatusOfPaymentCommand(
        userId,
        leaseId,
        paymentId,
        status
      );

      await this.CH.handle(command);

      return {
        message: "payment status update successfully ",
      };
    } catch (error: any) {
      console.error("fail to edit payment status !!", error);
      throw error;
    }
  }
}

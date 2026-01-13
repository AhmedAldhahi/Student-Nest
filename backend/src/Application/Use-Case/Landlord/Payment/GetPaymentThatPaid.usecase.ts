import { IReadUserRepositories } from "../../../../Domain/Modules/Identity/Repositories/ReadUserRepositories.repositories";
import { PaymentContext } from "../../../Strategy/Payment/PaymentContext";

export class GetPaymentThatPaidUseCase {
  constructor(
    private readonly paymentContext: PaymentContext,
    private readonly readUserRepo: IReadUserRepositories
  ) {}

  public async execute(userId: string, leaseId: string) {
    try {
      const user = await this.readUserRepo.findById(userId);
      if (!user) throw new Error("no user been found !!");

      return await this.paymentContext.GetAllPaymentHistoryThatPaidExecute(
        userId,
        user.getRole(),
        leaseId
      );
    } catch (error: any) {
      console.error("fail to get paid payments !!", error);
      throw error;
    }
  }
}

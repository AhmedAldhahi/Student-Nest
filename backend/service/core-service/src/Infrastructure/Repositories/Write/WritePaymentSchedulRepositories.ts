import { EntityManager } from "typeorm";
import { PaymentAggregateRoot } from "../../../Domain/BoundedContexts/Payment/AgregateRoot/Payment.AgregateRoot";
import { IWritePaymentScheduleRepo } from "../../../Domain/BoundedContexts/Payment/Repositories/WritePaymentSchedualRepositories";
import { PaymentMapper } from "../mapper/payment.mapper";

export class WritePaymentScheduleRepositories
  implements IWritePaymentScheduleRepo
{
  constructor(private readonly manger: EntityManager) {}

  public async updatePaymentSchedule(
    domain: PaymentAggregateRoot
  ): Promise<void> {
    try {
      const repo = PaymentMapper.toModel(domain);
      await this.manger.save(repo);
    } catch (error: any) {
      console.error("Error updating payment schedule:", error);
      throw new Error("Failed to update payment .");
    }
  }
}

import { AppDataSource } from "../../Database/orm/TypeOrm/data-source";
import { PaymentScheduleModel } from "../../Database/orm/TypeOrm/entity/PaymentSchedual.entity";
import { IReadPaymentScheduleRepo } from "../../../Domain/Modules/Payment/Repositories/ReadPaymentSchedualRepo.repostiores";
import { PaymentMapper } from "../mapper/payment.mapper";
import { PaymentsResponse } from "../../../Application/DTO/landlord/paymentRespone";

export class ReadPaymentScheduleRepositories
  implements IReadPaymentScheduleRepo
{
  public async FindAllPaymentScheduleForOneLease(
    userId: string,
    leaseId: string
  ): Promise<PaymentsResponse[] | null> {
    try {
      const paymentModels = await AppDataSource.getInstance()
        .getRepository(PaymentScheduleModel)
        .find({
          where: {
            leaseId: leaseId,
            lease: {
              landlordId: userId,
            },
          },
          relations: {
            receipts: true,
            lease: true,
          },
          order: {
            dueDate: "ASC",
          },
        });

      if (!paymentModels || paymentModels.length === 0) {
        return [];
      }

      return paymentModels.map((orm) => {
        return PaymentMapper.toResponse(orm);
      });
    } catch (error: any) {
      console.error("Failed to find payment schedule for lease,", error);
      throw new Error("Unable to retrieve payment schedule.");
    }
  }
}

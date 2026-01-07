import { AppDataSource } from "../../Database/orm/TypeOrm/data-source";
import { PaymentScheduleModel } from "../../Database/orm/TypeOrm/entity/PaymentSchedual.entity";
import { IReadPaymentScheduleRepo } from "../../../Domain/Modules/Payment/Repositories/ReadPaymentSchedualRepo.repostiores";
import { PaymentMapper } from "../mapper/payment.mapper";
import { PaymentsResponse } from "../../../Application/DTO/landlord/paymentRespone";
import { PaymentAggregateRoot } from "../../../Domain/Modules/Payment/AgregateRoot/Payment.AgregateRoot";

export class ReadPaymentScheduleRepositories
  implements IReadPaymentScheduleRepo
{
  public async FindAllPaymentAsArray(
    userId: string,
    leaseId: string,
    paymentId: string[]
  ): Promise<PaymentsResponse[] | null> {
    throw new Error("Method not implemented.");
  }

  public async FindPaymentScheduleById(
    userId: string,
    leaseId: string,
    paymentId: string
  ): Promise<PaymentAggregateRoot | null> {
    try {
      const paymentModel = await AppDataSource.getInstance()
        .getRepository(PaymentScheduleModel)
        .findOne({
          where: {
            scheduleId: paymentId,
            leaseId: leaseId,
            lease: {
              landlordId: userId,
            },
          },
          relations: {
            receipts: true,
            lease: true,
          },
        });

      if (!paymentModel) return null;

      return PaymentMapper.toDomain(paymentModel);
    } catch (error: any) {
      console.error("Failed to find specific payment schedule:", error);
      throw new Error("Unable to retrieve payment schedule.");
    }
  }

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

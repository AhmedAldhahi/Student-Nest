import { AppDataSource } from "../../Database/TypeOrm/data-source";
import { PaymentScheduleModel } from "../../Database/TypeOrm/entity/PaymentSchedual.entity";
import { IReadPaymentScheduleRepo, PaymentsResponse } from "../../../Domain/BoundedContexts/Payment/Repositories/ReadPaymentSchedualRepo.repostiores";
import { PaymentMapper } from "../mapper/payment.mapper";
import { PaymentAggregateRoot } from "../../../Domain/BoundedContexts/Payment/AgregateRoot/Payment.AgregateRoot";
import { In } from "typeorm";

export class ReadPaymentScheduleRepositories
  implements IReadPaymentScheduleRepo
{
  public async FindAllPaymentAsArray(
    userId: string,
    leaseId: string,
    paymentIds: string[] // Changed name slightly for clarity, matches interface logic
  ): Promise<PaymentsResponse[] | null> {
    try {
      if (!paymentIds || paymentIds.length === 0) {
        return [];
      }

      const paymentModels = await AppDataSource.getInstance()
        .getRepository(PaymentScheduleModel)
        .find({
          where: {
            leaseId: leaseId,
            lease: {
              landlordId: userId,
            },
            scheduleId: In(paymentIds),
          },
          relations: {
            receipt: true,
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
      console.error("Failed to find batch payment schedules:", error);
      throw new Error("Unable to retrieve specific payment schedules.");
    }
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
            receipt: true,
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
            receipt: true,
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

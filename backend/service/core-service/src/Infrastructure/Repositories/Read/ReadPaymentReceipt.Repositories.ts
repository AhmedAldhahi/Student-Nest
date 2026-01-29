import { ReceiptEntity } from "../../../Domain/BoundedContexts/Payment/Entities/ReceiptEntities.entity";
import { IReadReceiptPaymentRepo } from "../../../Domain/BoundedContexts/Payment/Repositories/ReadReceiptPaymentRepo.Repositories";
import { AppDataSource } from "../../Database/TypeOrm/data-source";
import { ReceiptModel } from "../../Database/TypeOrm/entity/Receipt.entity";
import { ReceiptMapper } from "../mapper/receipt.mapper";

export class ReadPaymentReceiptRepositories implements IReadReceiptPaymentRepo {
  public async findReceiptForPaymentScheduleByIdForStudent(
    userId: string,
    paymentId: string,
  ): Promise<ReceiptEntity | null> {
    try {
      const receiptRepo =
        AppDataSource.getInstance().getRepository(ReceiptModel);
      const receipt = await receiptRepo.findOne({
        where: {
          scheduleId: paymentId,
          payment: {
            lease: {
              studentId: userId,
            },
          },
        },
        relations: {
          payment: {
            lease: true,
          },
        },
        // We keep the order to ensure we get the *latest* receipt if multiple exist
        order: {
          createAt: "DESC",
        },
      });

      if (!receipt) {
        return null;
      }
      return ReceiptMapper.toDomain(receipt);
    } catch (error: any) {
      console.error("Error fetching receipt for payment:", error);
      throw new Error("Unable to retrieve receipt.");
    }
  }

  public async findAllReceiptForPaymentScheduleForOneReceiptById(
    userId: string,
    receiptId: string,
  ): Promise<ReceiptEntity[] | null> {
    try {
      const receiptModels = await AppDataSource.getInstance()
        .getRepository(ReceiptModel)
        .find({
          where: {
            receiptId: receiptId,
            payment: {
              lease: {
                landlordId: userId,
              },
            },
          },
          relations: {
            payment: {
              lease: true,
            },
          },
        });

      if (!receiptModels || receiptModels.length === 0) {
        return [];
      }

      return receiptModels.map((orm) => ReceiptMapper.toDomain(orm));
    } catch (error: any) {
      console.error("Failed to find specific receipt:", error);
      throw new Error("Unable to retrieve receipt.");
    }
  }

  public async findAllReceiptForPaymentScheduleById(
    userId: string,
    paymentId: string,
  ): Promise<ReceiptEntity[] | null> {
    try {
      const receiptRepo =
        AppDataSource.getInstance().getRepository(ReceiptModel);

      const receipts = await receiptRepo.find({
        where: {
          scheduleId: paymentId,
          payment: {
            lease: {
              landlordId: userId,
            },
          },
        },
        relations: {
          payment: {
            lease: true,
          },
        },
        order: {
          createAt: "DESC",
        },
      });

      if (!receipts || receipts.length === 0) {
        return [];
      }
      return receipts.map((receipt) => ReceiptMapper.toDomain(receipt));
    } catch (error: any) {
      console.error("Error fetching receipts for payment:", error);
      throw new Error("Unable to retrieve receipts.");
    }
  }
}

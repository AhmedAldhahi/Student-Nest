import { EntityManager } from "typeorm";
import { ReceiptEntity } from "../../../Domain/Modules/Payment/Entities/ReceiptEntities.entity";
import { IWriteReceiptRepo } from "../../../Domain/Modules/Payment/Repositories/writeReceiptRepo.Repositories";
import { ReceiptMapper } from "../mapper/receipt.mapper";

export class PaymentReceiptRepositories implements IWriteReceiptRepo {
  constructor(private readonly manger: EntityManager) {}
  public async updateReceipt(Entity: ReceiptEntity): Promise<void> {
    try {
      const repo = ReceiptMapper.toModel(Entity);
      await this.manger.save(repo);
    } catch (error: any) {
      console.error("Error updating payment Receipt:", error);
      throw new Error("Failed to update payment Receipt.");
    }
  }
}

import { ReceiptEntity } from "../Entities/ReceiptEntities.entity";

export interface IWriteReceiptRepo {
  updateReceipt(Entity: ReceiptEntity): Promise<void>;
}

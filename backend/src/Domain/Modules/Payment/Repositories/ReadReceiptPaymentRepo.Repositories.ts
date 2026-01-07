import { ReceiptEntity } from "../Entities/ReceiptEntities.entity";

export interface IReadReceiptPaymentRepo {
  findAllReceiptForPaymentScheduleById(
    userId: string,
    paymentId: string,
  ): Promise<ReceiptEntity[] | null>;
}

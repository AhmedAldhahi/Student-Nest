import { ReceiptEntity } from "../Entities/ReceiptEntities.entity";

export interface IReadReceiptPaymentRepo {
  findAllReceiptForPaymentScheduleById(
    userId: string,
    paymentId: string,
  ): Promise<ReceiptEntity[] | null>;

  findAllReceiptForPaymentScheduleForOneReceiptById(
    userId: string,
    receiptId: string,
  ): Promise<ReceiptEntity[] | null>;

  findReceiptForPaymentScheduleByIdForStudent(
    userId: string,
    paymentId: string,
  ): Promise<ReceiptEntity| null>;
}

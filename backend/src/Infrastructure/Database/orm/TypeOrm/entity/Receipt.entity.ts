import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { PaymentScheduleModel } from "./PaymentSchedual.entity";

@Entity("receipt")
export class ReceiptModel {
  @PrimaryColumn()
  receiptId: string;

  @Column({ type: "boolean", default: false })
  verifiedByLandlord: boolean;

  @Column({ type: "varchar", nullable: false })
  ReceiptUrl: string;

  @CreateDateColumn({ name: "createAt" })
  createAt: Date;

  @Column({ nullable: false })
  scheduleId: string;

  @ManyToOne(() => PaymentScheduleModel, (payment) => payment.receipts, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "scheduleId" })
  payment: PaymentScheduleModel;
}

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { PaymentScheduleModel } from "./PaymentSchedual.entity";
import { VerifiedLandlordStatus } from "../../../../../Domain/Shared/Enum/VerfiedLandlordStatus.enum";

@Entity("receipt")
export class ReceiptModel {
  @PrimaryColumn()
  receiptId: string;

  @Column({
    type: "enum",
    enum: VerifiedLandlordStatus,
    default: VerifiedLandlordStatus.Pending,
  })
  verifiedByLandlord: VerifiedLandlordStatus;

  @Column({ type: "varchar", nullable: false })
  ReceiptUrl: string;

  @CreateDateColumn({ name: "createAt" })
  createAt: Date;

  @Column({ nullable: false })
  scheduleId: string;

  @OneToOne(() => PaymentScheduleModel, (payment) => payment.receipt, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "scheduleId" }) 
  payment: PaymentScheduleModel;
}

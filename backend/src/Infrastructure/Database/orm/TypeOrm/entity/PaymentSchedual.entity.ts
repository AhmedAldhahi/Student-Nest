import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { LeaseModel } from "./Lease.entity";
import { ReceiptModel } from "./Receipt.entity";

@Entity("PaymentSchedule")
export class PaymentScheduleModel {
  @PrimaryColumn()
  scheduleId: string;

  @Column({ type: "boolean", default: false })
  paymentStatus: boolean;

  @Column({ type: "varchar", nullable: false })
  amount: string;

  @Column({ type: "date", nullable: false })
  dueDate: string;

  @Column({ nullable: false })
  leaseId: string;

  @ManyToOne(() => LeaseModel, (lease) => lease.payments, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "leaseId" })
  lease: LeaseModel;

  @OneToMany(() => ReceiptModel, (receipt) => receipt.payment, {
    cascade: true,
    eager: true,
  })
  receipts: ReceiptModel[];
}

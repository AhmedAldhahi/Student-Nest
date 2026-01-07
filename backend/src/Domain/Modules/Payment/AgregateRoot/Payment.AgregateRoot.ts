import { AggregateRoot } from "../../../Shared/AgregateRoot/AggregateRoot";
import { PaymentStatus } from "../../../Shared/Enum/PaymentStatus.enum";
import { ReceiptEntity } from "../Entities/ReceiptEntities.entity";
import { PaymentData } from "../Types/PaymentData";
import { PaymentAmount } from "../Value-Object/PaymentAmount.vo";

export class PaymentAggregateRoot extends AggregateRoot<string> {
  private paymentId: string;
  private paymentStatus: PaymentStatus = PaymentStatus.Pending;
  private amount: PaymentAmount;
  private dueDate: string;
  private leaseId: string;
  private paymentReceipt: ReceiptEntity[];

  constructor(Data: PaymentData) {
    super();
    this.paymentId = Data.paymentId;
    this.paymentStatus = Data.paymentStatus;
    this.amount = Data.amount;
    this.dueDate = Data.dueDate;
    this.leaseId = Data.leaseId;
    this.paymentReceipt = Data.paymentReceipt || [];
  }

  // factory method

  public static create(data: PaymentData) {
    return new PaymentAggregateRoot(data);
  }

  /**
   * ==================================================================================
   *                              Behavior Methods
   * ==================================================================================
   */

  public acceptPayment(): void {
    this.paymentStatus = PaymentStatus.Accept;
  }

  public rejectPayment(): void {
    this.paymentStatus = PaymentStatus.Reject;
  }

  public addReceipt(receipt: ReceiptEntity) {
    if (this.getPaymentStatus() === PaymentStatus.Accept) {
      throw new Error("Cannot upload receipt for an already accepted payment.");
    }

    this.paymentReceipt.push(receipt);
  }

  /**
   * ==================================================================================
   *                              Getter Methods
   * ==================================================================================
   */

  public getPaymentId(): string {
    return this.paymentId;
  }

  public getReceipt() {
    return this.paymentReceipt;
  }

  public getPaymentStatus(): PaymentStatus {
    return this.paymentStatus;
  }

  public getPaymentAmount(): string {
    return this.amount.getValue();
  }

  public getDueDate(): string {
    return this.dueDate;
  }

  public getLeaseId(): string {
    return this.leaseId;
  }
}

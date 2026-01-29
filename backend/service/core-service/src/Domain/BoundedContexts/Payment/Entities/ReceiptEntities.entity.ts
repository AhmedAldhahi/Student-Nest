import { VerifiedLandlordStatus } from "../Enum/VerfiedLandlordStatus.enum";
import { ReceiptDataType } from "../Types/ReceipData";

export class ReceiptEntity {
  private receiptId: string;
  private verifiedByLandlord: VerifiedLandlordStatus =
    VerifiedLandlordStatus.Pending;
  private ReceiptUrl: string;
  private createAt: Date;
  private scheduleId: string;

  constructor(data: ReceiptDataType) {
    this.receiptId = data.receiptId;
    this.verifiedByLandlord = data.verifiedByLandlord;
    this.ReceiptUrl = data.ReceiptUrl;
    this.createAt = data.createAt;
    this.scheduleId = data.scheduleId;
  }

  /**
   * ==================================================================================
   *                              Behavior Methods
   * ==================================================================================
   */

  public static create(data: ReceiptDataType) {
    if (!data.ReceiptUrl) {
      throw new Error("Receipt image URL is required.");
    }
    return new ReceiptEntity(data);
  }

  public markAsVerified(): void {
    this.verifiedByLandlord = VerifiedLandlordStatus.Accept;
    this.createAt = new Date();
  }

  public markAsNotVerified(): void {
    this.verifiedByLandlord = VerifiedLandlordStatus.Reject;
    this.createAt = new Date();
  }

  public updateReceiptUrl(url: string) {
    this.ReceiptUrl = url;
    this.createAt = new Date();
  }

  /**
   * ==================================================================================
   *                              Getter Methods
   * ==================================================================================
   */

  public getReceiptId(): string {
    return this.receiptId;
  }

  public getScheduleId(): string {
    return this.scheduleId;
  }

  public getVerifiedByLandlord() {
    return this.verifiedByLandlord;
  }

  public getReceiptUrl(): string {
    return this.ReceiptUrl;
  }

  public getCreateAt(): Date {
    return this.createAt;
  }
}

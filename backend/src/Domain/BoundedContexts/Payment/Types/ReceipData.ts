import { VerifiedLandlordStatus } from "../Enum/VerfiedLandlordStatus.enum";

export type  ReceiptDataType = {
  receiptId: string;
  verifiedByLandlord: VerifiedLandlordStatus;
  ReceiptUrl: string;
  createAt: Date;
  scheduleId: string;
}

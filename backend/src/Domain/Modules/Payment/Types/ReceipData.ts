import { VerifiedLandlordStatus } from "../../../Shared/Enum/VerfiedLandlordStatus.enum";

export interface ReceiptData {
  receiptId: string;
  verifiedByLandlord: VerifiedLandlordStatus;
  ReceiptUrl: string;
  createAt: Date;
  scheduleId: string;
}

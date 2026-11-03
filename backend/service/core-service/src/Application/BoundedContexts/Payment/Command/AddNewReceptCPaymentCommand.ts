import { ICommand } from "../../Shared/abstraction/ICommand";

export class AddNewReceiptCommand implements ICommand {
  public documentUrl: Express.Multer.File;
  public paymentId: string;
  public leaseId: string;
  public userId: string;

  constructor(
    userId: string,
    leaseId: string,
    paymentId: string,

    documentUrl: Express.Multer.File,
  ) {
    this.userId = userId;
    this.leaseId = leaseId;
    this.paymentId = paymentId;
    this.documentUrl = documentUrl;
  }
}

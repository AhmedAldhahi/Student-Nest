import { ICommand } from "../../Shared/abstraction/ICommand";

export class UpdateWhatsappPhoneNumberCommand implements ICommand {
  public userId: string;
  public whatsappStatus: boolean;

  constructor(userId: string, whatsappStatus: boolean) {
    this.userId = userId;
    this.whatsappStatus = whatsappStatus;
  }
}

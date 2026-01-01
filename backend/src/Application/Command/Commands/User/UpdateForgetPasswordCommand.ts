import { ICommand } from "../../ICommand";

export class UpdateForgetPasswordCommand implements ICommand {
  public email: string;
  public password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

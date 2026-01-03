import { LoginRequest } from "../../../DTO/shared/registeration/LoginRequest.dto";
import { IQueries } from "../../IQueries";

export class LoginUserQueries implements IQueries {
  public email: string;
  public password: string;

  constructor(loginData: LoginRequest) {
    this.email = loginData.email;
    this.password = loginData.password;
  }
}

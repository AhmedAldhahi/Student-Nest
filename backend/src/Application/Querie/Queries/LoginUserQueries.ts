import { LoginRequest } from "../../Dtos/registeration/LoginRequest.dtos";
import { IQueries } from "../IQuerie";

export class LoginUserQueries implements IQueries {
  public email: string;
  public password: string;

  constructor(loginData: LoginRequest) {
    this.email = loginData.email;
    this.password = loginData.password;
  }
}

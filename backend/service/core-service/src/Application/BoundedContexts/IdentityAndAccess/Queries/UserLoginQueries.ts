import { IQueries } from "../../Shared/abstraction/IQueries";
import { LoginRequest } from "../Dto/Request/LoginRequest";

export class UserLoginQueries implements IQueries {
  public email: string;
  public password: string;

  constructor(loginData: LoginRequest) {
    this.email = loginData.email;
    this.password = loginData.password;
  }
}

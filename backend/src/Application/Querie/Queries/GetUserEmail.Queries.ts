import { IQueries } from "../IQuerie";

export class GetUserEmailQueries implements IQueries {
  public email: string;
  constructor(email: string) {
    this.email = email;
  }
}

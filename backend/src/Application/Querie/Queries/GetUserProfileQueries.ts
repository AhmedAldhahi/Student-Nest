import { IQueries } from "../IQuerie";

export class GetUserProfileQueries implements IQueries {
  public userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }
}

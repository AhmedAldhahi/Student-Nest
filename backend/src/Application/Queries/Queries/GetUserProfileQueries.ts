import { IQueries } from "../IQueries";

export class GetUserProfileQueries implements IQueries {
  public userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }
}

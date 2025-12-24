import { IQueries } from "../IQuerie";

export class GetAllNotificationQueries implements IQueries {
  public userId: string;
  constructor(userId: string) {
    this.userId = userId;
  }
}

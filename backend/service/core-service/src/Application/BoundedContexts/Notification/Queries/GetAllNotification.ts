import { IQueries } from "../../Shared/abstraction/IQueries";

export class GetAllNotificationQueries implements IQueries {
  public userId: string;
  constructor(userId: string) {
    this.userId = userId;
  }
}

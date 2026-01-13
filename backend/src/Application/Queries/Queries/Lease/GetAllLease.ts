import { IQueries } from "../../IQueries";

export class GetAllLeaseQueries implements IQueries {
  public userId: string;
  constructor(userId: string) {
    this.userId = userId;
  }
}

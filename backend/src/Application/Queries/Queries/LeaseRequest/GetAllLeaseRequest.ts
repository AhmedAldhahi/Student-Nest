import { IQueries } from "../../IQueries";

export class GetAllLeaseRequestQueries implements IQueries {
  public userId: string;
  constructor(userId: string) {
    this.userId = userId;
  }
}

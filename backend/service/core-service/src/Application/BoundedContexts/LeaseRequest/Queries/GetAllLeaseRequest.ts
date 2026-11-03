import { IQueries } from "../../Shared/abstraction/IQueries";

export class GetAllLeaseRequestQueries implements IQueries {
  public userId: string;
  constructor(userId: string) {
    this.userId = userId;
  }
}

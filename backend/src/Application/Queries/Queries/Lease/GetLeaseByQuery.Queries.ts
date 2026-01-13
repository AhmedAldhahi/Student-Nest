import { IQueries } from "../../IQueries";

export class GetLeaseByQueryQueries implements IQueries {
  public Query: string;
  public userId: string;
  constructor(Query: string, userId: string) {
    this.Query = Query;
    this.userId = userId;
  }
}

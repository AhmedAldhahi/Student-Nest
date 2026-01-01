import { IQueries } from "../../IQueries";

export class GetLeaseByQueryQueries implements IQueries {
  public Query: string;
  constructor(Query: string) {
    this.Query = Query;
  }
}

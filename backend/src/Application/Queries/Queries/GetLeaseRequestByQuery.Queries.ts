import { IQueries } from "../IQueries";

export class GetLeaseRequestByQuery implements IQueries {
  public Query: string;
  constructor(Query: string) {
    this.Query = Query;
  }
}

import { IQueries } from "../../IQueries";

export class GetUserQueriesQueries implements IQueries {
  public query: string;
  constructor(query: string) {
    this.query = query;
  }
}

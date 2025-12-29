import { IQueries } from "../IQueries";

export class GetAuditLogByQueries implements IQueries {
  public query: string;
  constructor(query: string) {
    this.query = query;
  }
}

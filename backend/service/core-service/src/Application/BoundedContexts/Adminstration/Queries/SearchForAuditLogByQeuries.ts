import { IQueries } from "../../Shared/abstraction/IQueries";

export class GetAuditLogByQueries implements IQueries {
  public query: string;
  constructor(query: string) {
    this.query = query;
  }
}

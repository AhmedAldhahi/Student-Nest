import { IQueries } from "../../Shared/abstraction/IQueries";

export class SearchForApartmentByQueries implements IQueries {
  public queries: string;
  constructor(queries: string) {
    this.queries = queries;
  }
}

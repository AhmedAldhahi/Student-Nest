import { IQueries } from "../../Shared/abstraction/IQueries";

export class SearchForAllLeaseForApartmentQueries implements IQueries {
  public userId: string;
  public apartmentId: string;
  public queries: string;

  constructor(userId: string, apartmentId: string, queries: string) {
    this.userId = userId;
    this.apartmentId = apartmentId;
    this.queries = queries;
  }
}

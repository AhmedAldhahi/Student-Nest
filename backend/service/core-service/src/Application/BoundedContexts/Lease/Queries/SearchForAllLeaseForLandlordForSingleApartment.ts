import { IQueries } from "../../Shared/abstraction/IQueries";

export class SearchForAllLeaseForLandlordForSingleApartmentQueries
  implements IQueries
{
  public userId: string;
  public apartmentId: string;
  public queries: string;

  constructor(userId: string, apartmentId: string, queries: string) {
    this.apartmentId = apartmentId;
    this.userId = userId;
    this.queries = queries;
  }
}

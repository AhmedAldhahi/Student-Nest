import { SearchForAllLeaseForLandlordForSingleApartment } from "../../../Queries/Handlers/Leases/Lease/SearchForLeaseForSingleApartmentQueriesHandler";
import { SearchForAllLeaseForLandlordForSingleApartmentQueries } from "../../../Queries/Queries/Lease/SearchForAllLeaseForLandlordForSingleApartment";

export class SearchForAllLeaseForLandlordForSingleApartmentUseCase {
  constructor(
    private readonly Qh: SearchForAllLeaseForLandlordForSingleApartment
  ) {}

  public async execute(userId: string, apartmentId: string, Queries: string) {
    try {
      const queries = new SearchForAllLeaseForLandlordForSingleApartmentQueries(
        userId,
        apartmentId,
        Queries
      );

      return this.Qh.handle(queries);
    } catch (error: any) {
      console.error("fail to search for single apartments !!");
      throw error;
    }
  }
}

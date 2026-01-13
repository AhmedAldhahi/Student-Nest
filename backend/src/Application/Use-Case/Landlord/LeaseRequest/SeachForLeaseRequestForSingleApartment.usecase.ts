import { SearchForAllLeaseRequestForLandlordForSingleApartment } from "../../../Queries/Handlers/Leases/LeaseRequest/SeachForAllLeasRequestForSingleApartmentQueriesHandler";
import { SearchForLeastRequestForSingleApartmentQueries } from "../../../Queries/Queries/LeaseRequest/SeachForLeaseRequestForSingleApartmet";

export class SearchForLeaseRequestForSingleApartmentsUseCase {
  constructor(
    private readonly QH: SearchForAllLeaseRequestForLandlordForSingleApartment
  ) {}

  public async execute(userId: string, apartmentId: string, queries: string) {
    try {
      const Queries = new SearchForLeastRequestForSingleApartmentQueries(
        userId,
        apartmentId,
        queries
      );

      return this.QH.handle(Queries);
    } catch (error: any) {
      console.error("fail to search for leases Requests !!");
      throw error;
    }
  }
}

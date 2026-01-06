import { GetAllLeastRequestForSingleApartmentQueriesHandler } from "../../../Queries/Handlers/Leases/LeaseRequest/GetAllLeaseRequestForLandlordForSingleApartmentQueriesHandler";
import { GetAllLeastRequestForSingleApartmentQueries } from "../../../Queries/Queries/LeaseRequest/GetAllLeastRequestForSingleApartmentQueries";

export class GetForLeasesRequestForSingleApartmentUseCase {
  constructor(
    private readonly QH: GetAllLeastRequestForSingleApartmentQueriesHandler
  ) {}

  public async execute(userId: string, apartmentId: string) {
    try {
      const queries = new GetAllLeastRequestForSingleApartmentQueries(
        userId,
        apartmentId
      );

      return await this.QH.handle(queries);
    } catch (error: any) {
      console.error("fail to get leases request for single apartments !!");
      throw error;
    }
  }
}

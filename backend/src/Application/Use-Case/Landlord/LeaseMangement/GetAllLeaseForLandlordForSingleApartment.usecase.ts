import { GetAllLeaseForSingleApartmentQueriesHandler } from "../../../Queries/Handlers/Leases/Lease/GetAllLeaseForSingleApartmentQueriesHandler";
import { GetAllLeaseForApartmentQueries } from "../../../Queries/Queries/Lease/GetAllLeaseForApartment";

export class GetAllLeaseForLandlordForSingleApartmentUseCase {
  constructor(
    private readonly queriesHandler: GetAllLeaseForSingleApartmentQueriesHandler
  ) {}

  public async execute(userId: string, apartmentId: string) {
    try {
      const queries = new GetAllLeaseForApartmentQueries(userId,apartmentId);
      return await this.queriesHandler.handle(queries);
    } catch (error: any) {
      console.error("fail to get leases for single apartments !!");
      throw error;
    }
  }
}

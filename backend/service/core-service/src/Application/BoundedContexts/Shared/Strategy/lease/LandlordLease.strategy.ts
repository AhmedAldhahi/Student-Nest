import { GetAllLeaseForLandlordQueriesHandler } from "../../../Lease/QueriesHandler/GetAllLeaseForLandlordQueriesHandler";
import { GetAllLeaseForLandlordSearchQueriesHandler } from "../../../Lease/QueriesHandler/SearchForLeaseForLandlordQueriesHandler";
import { GetAllLeaseQueries } from "../../../Lease/Queries/GetAllLease";
import { GetLeaseByQueryQueries } from "../../../Lease/Queries/GetLeaseByQuery.Queries";
import { ILeaseStrategy } from "./ILease.strategy";

export class LandlordLeaseStrategy implements ILeaseStrategy {
  constructor(
    private readonly getAllLandlordLeaseQH: GetAllLeaseForLandlordQueriesHandler,
    private readonly searchAllLandlordLeaseQH: GetAllLeaseForLandlordSearchQueriesHandler
  ) {}

  public async FindAllLeases(userId: string): Promise<any> {
    try {
      const queries = new GetAllLeaseQueries(userId);
      return await this.getAllLandlordLeaseQH.handle(queries);
    } catch (error: any) {
      console.error("fail to get leases !!");
      throw error;
    }
  }

  public async SearchForLeases(query: string, userId: string): Promise<any> {
    try {
      const queries = new GetLeaseByQueryQueries(query, userId);
      return await this.searchAllLandlordLeaseQH.handle(queries);
    } catch (error: any) {
      console.error("fail to search for leases for single landlord  !!");
      throw error;
    }
  }
}

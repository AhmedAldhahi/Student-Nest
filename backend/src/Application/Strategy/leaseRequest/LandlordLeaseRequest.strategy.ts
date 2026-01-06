import { GetAllLeasesRequestQueriesHandler } from "../../Queries/Handlers/Leases/LeaseRequest/GetAllLeaseRequesForLandlordQueriesHandler";
import { SearchForLeaseRequestForLandlordQueriesHandler } from "../../Queries/Handlers/Leases/LeaseRequest/SearchForLeaseRequestForLandlord";
import { GetAllLeaseRequestQueries } from "../../Queries/Queries/LeaseRequest/GetAllLeaseRequest";
import { GetLeaseRequestByQuery } from "../../Queries/Queries/LeaseRequest/GetLeaseRequestByQuery.Queries";
import { ILeaseRequestStrategy } from "./IleaseRequest.strategy";

export class LandlordLeaseRequestStrategy implements ILeaseRequestStrategy {
  constructor(
    private readonly getAllLeaseRequestForLandlord: GetAllLeasesRequestQueriesHandler,
    private readonly searchForLeaseRequestForLandlord: SearchForLeaseRequestForLandlordQueriesHandler
  ) {}

  public async findLeaseRequestByQuery(
    userId: string,
    Queries: string
  ): Promise<any> {
    try {
      const queries = new GetLeaseRequestByQuery(Queries, userId);
      return await this.searchForLeaseRequestForLandlord.handle(queries);
    } catch (error: any) {
      console.log("fail to search for leases request for landlords !!");
      throw error;
    }
  }

  public async findAllLeaseRequest(userid: string): Promise<any> {
    try {
      const Queries = new GetAllLeaseRequestQueries(userid);

      return await this.getAllLeaseRequestForLandlord.handle(Queries);
    } catch (error: any) {
      console.error("fail to get leases request !!");
      throw error;
    }
  }
}

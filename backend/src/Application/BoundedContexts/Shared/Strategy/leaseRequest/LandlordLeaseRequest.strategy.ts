import { GetAllLeasesRequestForLandlordQueriesHandler } from "../../../LeaseRequest/QueriesHandler/GetAllLeaseRequesForLandlordQueriesHandler";
import { SearchForLeaseRequestForLandlordQueriesHandler } from "../../../LeaseRequest/QueriesHandler/SearchForLeaseRequestForLandlord";
import { GetAllLeaseRequestQueries } from "../../../LeaseRequest/Queries/GetAllLeaseRequest";
import { GetLeaseRequestByQuery } from "../../../LeaseRequest/Queries/GetLeaseRequestByQuery.Queries";
import { ILeaseRequestStrategy } from "./ILeaseRequest.strategy";

export class LandlordLeaseRequestStrategy implements ILeaseRequestStrategy {
  constructor(
    private readonly getAllLeaseRequestForLandlord: GetAllLeasesRequestForLandlordQueriesHandler,
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

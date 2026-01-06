import { GetAllLeasesRequestQueriesHandler } from "../../Queries/Handlers/Leases/LeaseRequest/GetAllLeaseRequesForLandlordQueriesHandler";
import { GetAllLeaseRequestQueries } from "../../Queries/Queries/LeaseRequest/GetAllLeaseRequest";
import { ILeaseRequestStrategy } from "./IleaseRequest.strategy";

export class LandlordLeaseRequestStrategy implements ILeaseRequestStrategy {
  constructor(
    private readonly getAllLeaseRequestForLandlord: GetAllLeasesRequestQueriesHandler
  ) {}

  public async findLeaseRequestByQuery(
    userId: string,
    Queries: string
  ): Promise<any> {
    throw new Error("Method not implemented.");
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

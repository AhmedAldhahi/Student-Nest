
import { GetAllLeaseRequestQueriesHandler } from "../../Queries/Handlers/Leases/LeaseRequest/GetAllLeaseRequestQueriesHandler";
import { GetLeaseRequestByQueryQueriesHandler } from "../../Queries/Handlers/Leases/LeaseRequest/GetLeaseRequestByQueryQueriesHandler";
import { GetLeaseRequestByQuery } from "../../Queries/Queries/LeaseRequest/GetLeaseRequestByQuery.Queries";
import { ILeaseRequestStrategy } from "./IleaseRequest.strategy";

export class AdminLeaseRequestStrategy implements ILeaseRequestStrategy {
  constructor(
    private readonly GetAllLeaseRequestQH: GetAllLeaseRequestQueriesHandler,
    private readonly GetLeasesRequestByQueries: GetLeaseRequestByQueryQueriesHandler
  ) {}

  public async findLeaseRequestByQuery(
    userId: string,
    Queries: string
  ): Promise<any> {
    try {
      const queries = new GetLeaseRequestByQuery(Queries);
      return await this.GetLeasesRequestByQueries.handle(queries);
    } catch (error: any) {
      console.error("fail to get leases requests !!");
      throw error;
    }
  }

  public async findAllLeaseRequest(userid: string): Promise<any> {
    try {
      return await this.GetAllLeaseRequestQH.handle();
    } catch (error: any) {
      console.error("fail to get lease requests !!");
      throw error;
    }
  }
}

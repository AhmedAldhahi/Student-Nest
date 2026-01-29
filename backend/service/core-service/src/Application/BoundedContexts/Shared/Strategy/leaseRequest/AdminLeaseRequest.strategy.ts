
import { GetAllLeaseRequestQueriesHandler } from "../../../LeaseRequest/QueriesHandler/GetAllLeaseRequestQueriesHandler";
import { GetLeaseRequestByQueryQueriesHandler } from "../../../LeaseRequest/QueriesHandler/GetLeaseRequestByQueryQueriesHandler";
import { GetLeaseRequestByQuery } from "../../../LeaseRequest/Queries/GetLeaseRequestByQuery.Queries";
import { ILeaseRequestStrategy } from "./ILeaseRequest.strategy";

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
      const queries = new GetLeaseRequestByQuery(Queries,userId);
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

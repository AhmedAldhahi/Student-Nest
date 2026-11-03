import { GetAllLeaseQueriesHandler } from "../../../Lease/QueriesHandler/GetAllLeaseQueriesHandler";
import { GetLeaseByQueryQueriesHandler } from "../../../Lease/QueriesHandler/GetLeaseByQueryQueriesHandler";
import { GetLeaseByQueryQueries } from "../../../Lease/Queries/GetLeaseByQuery.Queries";
import { ILeaseStrategy } from "./ILease.strategy";

export class AdminLeaseStrategy implements ILeaseStrategy {
  constructor(
    private readonly getAllAdminLease: GetAllLeaseQueriesHandler,
    private readonly getLeaseByQuery: GetLeaseByQueryQueriesHandler
  ) {}

  public async FindAllLeases(userId: string): Promise<any> {
    try {
      return await this.getAllAdminLease.handle();
    } catch (error: any) {
      console.error("fail to get all leases!!");
      throw error;
    }
  }

  public async SearchForLeases(Query: string, userId: string): Promise<any> {
    try {
      const query = new GetLeaseByQueryQueries(Query,userId);
      return await this.getLeaseByQuery.handle(query);
    } catch (error: any) {
      console.error("fail to get leases !!");
      throw error;
    }
  }
}

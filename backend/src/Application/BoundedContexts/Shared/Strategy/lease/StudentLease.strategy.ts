import { GetAllLeaseQueries } from "../../../Lease/Queries/GetAllLease";
import { GetLeaseByQueryQueries } from "../../../Lease/Queries/GetLeaseByQuery.Queries";
import { GetAllLeaseForStudentQueriesHandler } from "../../../Lease/QueriesHandler/GetAllLeaseForStudentQueriesHandler";
import { GetAllLeaseForStudentSearchQueriesHandler } from "../../../Lease/QueriesHandler/SearchForLeaseForStudentQueriesHandler";
import { ILeaseStrategy } from "./ILease.strategy";

export class StudentLeaseStrategy implements ILeaseStrategy {
  constructor(
    private readonly getAllLeaseQH: GetAllLeaseForStudentQueriesHandler,
    private readonly searchAllLeaseQH: GetAllLeaseForStudentSearchQueriesHandler
  ) {}

  public async FindAllLeases(userId: string): Promise<any> {
    try {
      const queries = new GetAllLeaseQueries(userId);
      return await this.getAllLeaseQH.handle(queries);
    } catch (error: any) {
      console.error("fail to get leases !!");
      throw error;
    }
  }

  public async SearchForLeases(query: string, userId: string): Promise<any> {
    try {
      const queries = new GetLeaseByQueryQueries(query, userId);
      return await this.searchAllLeaseQH.handle(queries);
    } catch (error: any) {
      console.error("fail to search for leases for single landlord  !!");
      throw error;
    }
  }
}

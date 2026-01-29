import { GetAllLeaseRequestQueries } from "../../../LeaseRequest/Queries/GetAllLeaseRequest";
import { GetLeaseRequestByQuery } from "../../../LeaseRequest/Queries/GetLeaseRequestByQuery.Queries";
import { GetAllLeasesRequestForStudentQueriesHandler } from "../../../LeaseRequest/QueriesHandler/GetAllLeaseRequestForStudentQueriesHandler";
import { SearchForLeaseRequestForStudentQueriesHandler } from "../../../LeaseRequest/QueriesHandler/SearchForAllLeaseRequestForStudentQueriesHandler";
import { ILeaseRequestStrategy } from "./ILeaseRequest.strategy";

export class StudentLeaseRequestStrategy implements ILeaseRequestStrategy {
  constructor(
    private readonly getAllLeaseRequestQH: GetAllLeasesRequestForStudentQueriesHandler,
    private readonly searchAllLeaseRequestQH: SearchForLeaseRequestForStudentQueriesHandler
  ) {}

  public async findLeaseRequestByQuery(
    userId: string,
    Queries: string
  ): Promise<any> {
    try {
      const queries = new GetLeaseRequestByQuery(Queries, userId);
      return await this.searchAllLeaseRequestQH.handle(queries);
    } catch (error: any) {
      console.log("fail to search for leases request for landlords !!");
      throw error;
    }
  }

  public async findAllLeaseRequest(userid: string): Promise<any> {
    try {
      const Queries = new GetAllLeaseRequestQueries(userid);

      return await this.getAllLeaseRequestQH.handle(Queries);
    } catch (error: any) {
      console.error("fail to get leases request !!");
      throw error;
    }
  }
}

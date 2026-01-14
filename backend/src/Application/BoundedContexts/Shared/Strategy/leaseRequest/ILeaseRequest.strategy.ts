export interface ILeaseRequestStrategy {
  findAllLeaseRequest(userid: string): Promise<any>;
  findLeaseRequestByQuery(userId: string, Queries: string): Promise<any>;
}

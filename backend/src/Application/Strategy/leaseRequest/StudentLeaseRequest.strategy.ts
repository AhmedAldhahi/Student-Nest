import { ILeaseRequestStrategy } from "./IleaseRequest.strategy";

export class StudentLeaseRequestStrategy implements ILeaseRequestStrategy {
  constructor() {}

  public async findLeaseRequestByQuery(
    userId: string,
    Queries: string
  ): Promise<any> {
    throw new Error("Method not implemented.");
  }

  public async findAllLeaseRequest(userid: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
}

import { IQueries } from "../IQuerie";

export class GetLeaseByIdQueries implements IQueries {
  public leaseId: number;
  constructor(leaseId: number) {
    this.leaseId = leaseId;
  }
}

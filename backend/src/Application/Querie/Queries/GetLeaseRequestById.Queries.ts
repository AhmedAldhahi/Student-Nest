import { IQueries } from "../IQuerie";

export class GetLeaseRequestById implements IQueries {
  public id: number;
  constructor(id: number) {
    this.id = id;
  }
}

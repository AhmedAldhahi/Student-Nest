import { IQueries } from "../../IQueries";

export class GetApartmentByIdQueries implements IQueries {
  public id: string;
  public userId: string;
  constructor(id: string, userId: string) {
    this.id = id;
    this.userId = userId;
  }
}

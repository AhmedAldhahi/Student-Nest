import { IQueries } from "../../IQueries";

export class GetAllApartmentQueries implements IQueries {
  public userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }
}

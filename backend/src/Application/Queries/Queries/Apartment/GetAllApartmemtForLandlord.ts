import { IQueries } from "../../IQueries";

export class GetAllApartmentForLandlord implements IQueries {
  public userId: string;
  constructor(userId: string) {
    this.userId = userId;
  }
}

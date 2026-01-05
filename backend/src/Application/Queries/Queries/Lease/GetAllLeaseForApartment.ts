import { IQueries } from "../../IQueries";

export class GetAllLeaseForApartmentQueries implements IQueries {
  public userId: string;
  public apartmentId: string;

  constructor(userId: string, apartmentId: string) {
    this.userId = userId;
    this, (apartmentId = apartmentId);
  }
}

import { IQueries } from "../../Shared/abstraction/IQueries";

export class GetAllLeastRequestForSingleApartmentQueries implements IQueries {
  public userId: string;
  public apartmentId: string;

  constructor(userId: string, apartmentId: string) {
    this.userId = userId;
    this.apartmentId = apartmentId;
  }
}

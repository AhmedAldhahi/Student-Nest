import { IQueries } from "../../IQueries";

export class GetDocumentOfApartmentByIdQueries implements IQueries {
  public apartmentDocumentId: string;
  public userId: string;
  constructor(apartmentDocumentId: string, userId: string) {
    this.apartmentDocumentId = apartmentDocumentId;
    this.userId = userId;
  }
}

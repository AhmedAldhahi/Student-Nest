import { IQueries } from "../../IQueries";

export class GetDocumentOfApartmentByIdQueries implements IQueries {
  public apartmentDocumentId: string;
  constructor(apartmentDocumentId: string) {
    this.apartmentDocumentId = apartmentDocumentId;
  }
}

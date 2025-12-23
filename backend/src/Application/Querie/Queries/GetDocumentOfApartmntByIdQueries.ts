import { IQueries } from "../IQuerie";

export class GetDocumentOfApartmentByIdQueries implements IQueries {
  public apartmentDocumentId: number;
  constructor(apartmentDocumentId: number) {
    this.apartmentDocumentId = apartmentDocumentId;
  }
}

import { ApartmentDocumentEntity } from "../../Entities/apartmentDocument.entity";

export interface IWriteApartmentDocumentRepo {
  updateApartmentDocument(apartmentDoc: ApartmentDocumentEntity): Promise<void>;
}

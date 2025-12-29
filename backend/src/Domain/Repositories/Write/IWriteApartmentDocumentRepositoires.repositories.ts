import { ApartmentDocumentEntity } from "../../Entities/apartmentDocumentEntity.entity";

export interface IWriteApartmentDocumentRepo {
  updateApartmentDocument(apartmentDoc: ApartmentDocumentEntity): Promise<void>;
}

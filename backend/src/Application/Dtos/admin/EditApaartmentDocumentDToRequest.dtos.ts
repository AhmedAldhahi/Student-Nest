import { ApartmentDocumentType } from "../../../Domain/Enum/ApartmentDocument.enum";

export interface EditApartmentDocumentDataRequest {
  documentUrl?: string;
  apartmentType?: ApartmentDocumentType;
}

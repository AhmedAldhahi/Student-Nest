import { ApartmentDocumentType } from "../../../Domain/Shared/Enum/ApartmentDocument.enum";

export interface EditApartmentDocumentDataRequest {
  documentUrl?: string;
  apartmentType?: ApartmentDocumentType;
}

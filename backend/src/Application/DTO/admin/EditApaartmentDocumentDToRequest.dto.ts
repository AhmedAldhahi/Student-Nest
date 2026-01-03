import { ApartmentDocumentType } from "../../../Domain/Shared/Enum/ApartmentDocument.enum";

export interface EditApartmentDocumentDataRequest {
  documentUrl?: Express.Multer.File;
  apartmentType?: ApartmentDocumentType;
}

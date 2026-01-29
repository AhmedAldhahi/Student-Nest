import { ApartmentDocumentType } from "../../../../../Domain/BoundedContexts/Housing/Enum/ApartmentDocument.enum";

export interface UpdateApartmentDocumentDataRequest {
  documentUrl?: Express.Multer.File;
  apartmentType?: ApartmentDocumentType;
}
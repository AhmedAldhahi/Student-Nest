import { ApartmentDocumentType } from "../Enum/ApartmentDocument.enum";

export type  ApartmentDocumentData  = {
  apartmentDocumentId: string;
  apartmentType: ApartmentDocumentType; // enum
  documentUrl: string;
  apartmentsId: string;
}
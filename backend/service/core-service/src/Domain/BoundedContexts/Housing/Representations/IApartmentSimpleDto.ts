import { ApartmentDocumentEntity } from "../Entities/apartmentDocumentEntity.entity";
import { ApartmentPhotoDocumentEntity } from "../Entities/phohtoDocumentEntity.entity";

export interface IApartmentSimpleDTO {
  apartmentId: string;
  isVisible: boolean;
  title: string;
  description: string;
  address: string;
  isVerified: boolean;
  isJoin: boolean;
  numberOfBed: string;
  numberOfRoom: string;
  price: string;
  landlordId: string;
  landlordName: string;
  apartmentPhoto: ApartmentPhotoDocumentEntity[];
  apartmentDocuments: ApartmentDocumentEntity | null;
}
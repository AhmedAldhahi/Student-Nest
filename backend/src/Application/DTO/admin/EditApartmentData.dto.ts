import { ApartmentPhotoDocumentEntity } from "../../../Domain/Entities/phohtoDocumentEntity.entity";

export interface EditApartmentDataRequest {
  title?: string;
  description?: string;
  address?: string;
  numberOfBed?: string;
  numberOfRoom?: string;
  isJoin?: boolean;
  price?: string;
  photos?: ApartmentPhotoDocumentEntity[];
}

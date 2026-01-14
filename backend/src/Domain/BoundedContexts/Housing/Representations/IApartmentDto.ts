import { ApartmentDocumentEntity } from "../Entities/apartmentDocumentEntity.entity";
import { GoogleMapLocationEntity } from "../Entities/googleMapLocationEntity.entity";
import { ApartmentPhotoDocumentEntity } from "../Entities/phohtoDocumentEntity.entity";

export interface IApartmentDTO {
  apartmentId: string;
  isVisible: boolean;
  title: string;
  description: string;
  address: string;
  isVerified: boolean;
  isJoin: boolean;
  createAt: Date;
  updateAt: Date;

  numberOfBed: string;
  numberOfRoom: string;
  price: string;

  landlordName: string;
  googleMapLocation: GoogleMapLocationEntity;
  apartmentDocument: ApartmentDocumentEntity | null;
  apartmentPhoto: ApartmentPhotoDocumentEntity[];
}
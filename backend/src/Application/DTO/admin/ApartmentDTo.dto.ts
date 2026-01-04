import { ApartmentDocumentEntity } from "../../../Domain/Modules/Housing/Entities/apartmentDocumentEntity.entity";
import { GoogleMapLocationEntity } from "../../../Domain/Modules/Housing/Entities/googleMapLocationEntity.entity";
import { ApartmentPhotoDocumentEntity } from "../../../Domain/Modules/Housing/Entities/phohtoDocumentEntity.entity";

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
  googleMapLocation: GoogleMapLocationEntity;
  apartmentDocuments: ApartmentDocumentEntity | null;
}

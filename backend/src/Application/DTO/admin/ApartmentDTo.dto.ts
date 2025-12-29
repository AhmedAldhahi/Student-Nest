import { ApartmentDocumentEntity } from "../../../Domain/Entities/apartmentDocumentEntity.entity";
import { GoogleMapLocationEntity } from "../../../Domain/Entities/googleMapLocationEntity.entity";
import { ApartmentPhotoDocumentEntity } from "../../../Domain/Entities/phohtoDocumentEntity.entity";

export interface IApartmentDTO {
  apartmentId: number;
  propertyStatus: boolean;
  title: string;
  description: string;
  address: string;
  Verified: boolean;
  isFully: boolean;
  isJoin: boolean;
  createAt: Date;
  updateAt: Date;

  numberOfBed: string;
  numberOfRoom: string;
  price: string;

  landlordName: string;
  googleMapLocation: GoogleMapLocationEntity;
  apartmentDocument: ApartmentDocumentEntity[];
  apartmentPhoto: ApartmentPhotoDocumentEntity[];
}

export interface IApartmentSimpleDTO {
  apartmentId: number;
  propertyStatus: boolean;
  title: string;
  description: string;
  address: string;
  Verified: boolean;
  isFully: boolean;
  isJoin: boolean;
  numberOfBed: string;
  numberOfRoom: string;
  price: string;
  landlordName: string;
  apartmentPhoto: ApartmentPhotoDocumentEntity[];
}

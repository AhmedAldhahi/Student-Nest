import { ApartmentDocumentEntity } from "../Entities/apartmentDocumentEntity.entity";
import { GoogleMapLocationEntity } from "../Entities/googleMapLocationEntity.entity";
import { ApartmentPhotoDocumentEntity } from "../Entities/phohtoDocumentEntity.entity";
import { ApartmentPrice } from "../Value-Object/ApartmentPrice.vo";
import { NumberOfBed } from "../Value-Object/NumberOfBed.vo";
import { NumberOfRoom } from "../Value-Object/NumberOfRoom.vo";

export interface ApartmentData {
  apartmentId: string;
  propertyStatus: boolean;
  title: string;
  description: string;
  price: ApartmentPrice;
  address: string;
  Verified: boolean;
  numberOfRoom: NumberOfRoom;
  numberOfBed: NumberOfBed;
  isJoin: boolean;
  createAt: Date;
  updateAt: Date;
  landlordId: string; 
  isFully: boolean;

  apartmentDocument: ApartmentDocumentEntity[];
  apartmentPhoto: ApartmentPhotoDocumentEntity[];
  googleMapLocation: GoogleMapLocationEntity;
} 


export interface ApartmentDataResponse{
  apartmentId: string;
  propertyStatus: boolean;
  title: string;
  description: string;
  price: string;
  address: string;
  Verified: boolean;
  numberOfRoom: string;
  numberOfBed: string;
  isJoin: boolean;
  createAt: Date;
  updateAt: Date;
  landlordId: string; 
  isFully: boolean;

  apartmentDocument: ApartmentDocumentEntity[];
  apartmentPhoto: ApartmentPhotoDocumentEntity[];
  googleMapLocation: GoogleMapLocationEntity;
} 
import { ApartmentDocumentEntity } from "../Entities/apartmentDocumentEntity.entity";
import { GoogleMapLocationEntity } from "../Entities/googleMapLocationEntity.entity";
import { ApartmentPhotoDocumentEntity } from "../Entities/phohtoDocumentEntity.entity";
import { ApartmentPrice } from "../Value-Object/ApartmentPrice.vo";
import { NumberOfBed } from "../Value-Object/NumberOfBed.vo";
import { NumberOfRoom } from "../Value-Object/NumberOfRoom.vo";

export type ApartmentDataType = {
  apartmentId: string;
  isVisible: boolean;
  title: string;
  description: string;
  price: ApartmentPrice;
  address: string;
  IsVerified: boolean;
  numberOfRoom: NumberOfRoom;
  numberOfBed: NumberOfBed;
  isJoin: boolean;
  createAt: Date;
  updateAt: Date;
  landlordId: string;

  apartmentDocument: ApartmentDocumentEntity | null;
  apartmentPhoto: ApartmentPhotoDocumentEntity[];
  googleMapLocation: GoogleMapLocationEntity;
};

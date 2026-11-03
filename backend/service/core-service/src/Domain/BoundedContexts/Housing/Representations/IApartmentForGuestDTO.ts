import { GoogleMapLocationEntity } from "../Entities/googleMapLocationEntity.entity";
import { ApartmentPhotoDocumentEntity } from "../Entities/phohtoDocumentEntity.entity";

export interface IApartmentForGuestDTO {
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
  apartmentPhoto: ApartmentPhotoDocumentEntity[];
}

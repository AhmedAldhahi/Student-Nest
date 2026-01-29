import { GoogleMapLocationEntity } from "../../../../../Domain/BoundedContexts/Housing/Entities/googleMapLocationEntity.entity";
import { ApartmentPhotoDocumentEntity } from "../../../../../Domain/BoundedContexts/Housing/Entities/phohtoDocumentEntity.entity";

export interface CreateApartmentResponse {
  apartmentId: string;
  isVisible: boolean;
  price: string | undefined;
  title: string;
  description: string;
  address: string;
  createAt: Date;
  updateAt: Date;
  numberOfBed: string | undefined;
  numberOfRoom: string | undefined;
  apartmentPhoto: ApartmentPhotoDocumentEntity[];
  googleMapLocation: GoogleMapLocationEntity;
  landlordId: string;
  isJoin: boolean;
  isVerified: boolean;
  landlordName: string | undefined;
}

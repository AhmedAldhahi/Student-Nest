import { GoogleMapLocationEntity } from "../../../../../Domain/BoundedContexts/Housing/Entities/googleMapLocationEntity.entity";
import { ApartmentPhotoDocumentEntity } from "../../../../../Domain/BoundedContexts/Housing/Entities/phohtoDocumentEntity.entity";

export interface UpdateApartmentDetailResponse {
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
  IsVerified: boolean;
  landlordName: string | undefined;
}

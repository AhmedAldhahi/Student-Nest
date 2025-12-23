import { ApartmentDocumentEntity } from "../../../Domain/Entities/apartmentDocument.entity";
import { GoogleMapLocationEntity } from "../../../Domain/Entities/googleMapLocationEntity.entity";

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
}

import { ApartmentAggregateRoot } from "../AgregateRoot/apartmentEntity.entity";
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
  apartmentDocuments: ApartmentDocumentEntity | null;
}

export interface IReadApartmentRepo {
  findAllApartment(userId: string): Promise<IApartmentSimpleDTO[] | null>;

  findAllApartmentForLandlord(
    userId: string
  ): Promise<IApartmentSimpleDTO[] | null>;

  FindAllApartmentThatBeenVerified(): Promise<IApartmentSimpleDTO[] | null>;

  findApartmentByQuery(
    prefix: string,
    userId: string
  ): Promise<IApartmentSimpleDTO[] | null>;
  findApartmentByQueryForLandlord(
    prefix: string,
    userId: string
  ): Promise<IApartmentSimpleDTO[] | null>;

  findApartmentById(id: string): Promise<ApartmentAggregateRoot | null>;
  findApartmentByIdForLandlord(
    id: string,
    userId: string
  ): Promise<ApartmentAggregateRoot | null>;

  findApartmentForLandlordById(
    id: string,
    userId: string
  ): Promise<ApartmentAggregateRoot | null>;

  findApartmentDetailsById(id: string): Promise<IApartmentDTO | null>;
  findApartmentDetailsByIdForLandlord(
    id: string,
    userId: string
  ): Promise<IApartmentDTO | null>;

  findAllApartmentBasedArray(
    ids: string[],
    userId: string
  ): Promise<IApartmentSimpleDTO[] | null>;

  SearchForApartmentBasedArray(
    ids: string[],
    queries: string,
    userId: string
  ): Promise<ApartmentAggregateRoot[] | null>;
}

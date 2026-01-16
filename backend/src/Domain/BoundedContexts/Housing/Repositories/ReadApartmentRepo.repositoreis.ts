import { ApartmentAggregateRoot } from "../AgregateRoot/apartmentEntity.entity";
import { IApartmentDTO } from "../Representations/IApartmentDto";
import { IApartmentSimpleDTO } from "../Representations/IApartmentSimpleDto";
export interface IReadApartmentRepo {
  findAllApartment(userId?: string): Promise<IApartmentSimpleDTO[] | null>;

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

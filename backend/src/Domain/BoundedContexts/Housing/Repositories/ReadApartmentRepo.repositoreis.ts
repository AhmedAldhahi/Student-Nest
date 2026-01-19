import { ApartmentAggregateRoot } from "../AgregateRoot/apartmentEntity.entity";
import { IApartmentDTO } from "../Representations/IApartmentDto";
import { IApartmentForGuestDTO } from "../Representations/IApartmentForGuestDTO";
import { IApartmentSimpleDTO } from "../Representations/IApartmentSimpleDto";
import { FilterOptionType } from "../Types/ApartmentFilterType.type";
export interface IReadApartmentRepo {
  findAllApartment(userId?: string): Promise<IApartmentSimpleDTO[] | null>;

  findAllApartmentForLandlord(
    userId: string,
  ): Promise<IApartmentSimpleDTO[] | null>;

  FindAllApartmentThatBeenVerified(): Promise<IApartmentSimpleDTO[] | null>;

  findApartmentByQuery(
    prefix: string,
    userId: string,
  ): Promise<IApartmentSimpleDTO[] | null>;
  findApartmentByQueryForLandlord(
    prefix: string,
    userId: string,
  ): Promise<IApartmentSimpleDTO[] | null>;

  findApartmentById(id: string): Promise<ApartmentAggregateRoot | null>;
  findApartmentByIdForLandlord(
    id: string,
    userId: string,
  ): Promise<ApartmentAggregateRoot | null>;

  findApartmentForLandlordById(
    id: string,
    userId: string,
  ): Promise<ApartmentAggregateRoot | null>;

  findApartmentDetailsById(id: string): Promise<IApartmentDTO | null>;
  findApartmentDetailsByIdForLandlord(
    id: string,
    userId: string,
  ): Promise<IApartmentDTO | null>;

  findAllApartmentBasedArray(
    ids: string[],
    userId: string,
  ): Promise<IApartmentSimpleDTO[] | null>;

  SearchForApartmentBasedArray(
    ids: string[],
    queries: string,
    userId: string,
  ): Promise<ApartmentAggregateRoot[] | null>;

  findApartmentDetailsForGuestById(
    id: string,
  ): Promise<IApartmentForGuestDTO | null>;

  filterApartment(
    type: FilterOptionType,
  ): Promise<IApartmentSimpleDTO[] | null>;
}

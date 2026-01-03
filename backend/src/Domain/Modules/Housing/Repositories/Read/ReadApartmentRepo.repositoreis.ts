import {
  IApartmentSimpleDTO,
  IApartmentDTO,
} from "../../../../../Application/DTO/admin/ApartmentDTo.dto";
import { ApartmentAggregateRoot } from "../../AgregateRoot/apartmentEntity.entity";

export interface IReadApartmentRepo {
  findAllApartment(userId: string): Promise<IApartmentSimpleDTO[] | null>;

  findAllApartmentForLandlord(
    userId: string
  ): Promise<IApartmentSimpleDTO[] | null>;

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
}

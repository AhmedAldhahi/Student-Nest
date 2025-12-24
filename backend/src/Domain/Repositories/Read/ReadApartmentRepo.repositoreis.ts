import {
  IApartmentDTO,
  IApartmentSimpleDTO,
} from "../../../Application/Dtos/admin/ApartmentDTo.dtos";
import { ApartmentAggregateRoot } from "../../AggregatesRoot/apartmentEntity.entity";

export interface IReadApartmentRepo {
  findAllApartment(): Promise<IApartmentSimpleDTO[] | null>;
  findApartmentName(prefix: string): Promise<IApartmentSimpleDTO[] | null>;
  findApartmentById(id: number): Promise<ApartmentAggregateRoot | null>;
  findApartmentDetailsById(id: number): Promise<IApartmentDTO | null>;
}

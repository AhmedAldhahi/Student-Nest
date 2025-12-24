import {
  IApartmentDTO,
  IApartmentSimpleDTO,
} from "../../../Application/Dtos/admin/ApartmentDTo.dtos";
import { ApartmentAggregateRoot } from "../../AggregatesRoot/apartmentEntity.entity";

export interface IReadApartmentRepo {
  findAllApartment(): Promise<IApartmentSimpleDTO[] | null>;
  findApartmentTitle(prefix: string): Promise<IApartmentDTO[] | null>;
  findApartmentById(id: number): Promise<ApartmentAggregateRoot | null>;
  findApartmentDetailsById(id: number): Promise<IApartmentDTO | null>;
}

import {
  IApartmentSimpleDTO,
  IApartmentDTO,
} from "../../../Application/DTO/admin/ApartmentDTo.dto";
import { ApartmentAggregateRoot } from "../../AggregatesRoot/apartmentEntity.entity";

export interface IReadApartmentRepo {
  findAllApartment(): Promise<IApartmentSimpleDTO[] | null>;
  findApartmentByQuery(prefix: string): Promise<IApartmentSimpleDTO[] | null>;
  findApartmentById(id: number): Promise<ApartmentAggregateRoot | null>;
  findApartmentDetailsById(id: number): Promise<IApartmentDTO | null>;
}

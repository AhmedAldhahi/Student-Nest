
import { IApartmentSimpleDTO, IApartmentDTO } from "../../../Application/DTO/admin/ApartmentDTo.dto";
import { ApartmentAggregateRoot } from "../../AggregatesRoot/apartmentEntity.entity";

export interface IReadApartmentRepo {
  findAllApartment(): Promise<IApartmentSimpleDTO[] | null>;
  findApartmentTitle(prefix: string): Promise<IApartmentDTO[] | null>;
  findApartmentById(id: number): Promise<ApartmentAggregateRoot | null>;
  findApartmentDetailsById(id: number): Promise<IApartmentDTO | null>;
}

import { IApartmentDTO } from "../../../Application/Dtos/admin/ApartmentDTo.dtos";
import { ApartmentEntity } from "../../AggregatesRoot/apartmentEntity.entity";

export interface IReadApartmentRepo {
  findAllApartment(): Promise<IApartmentDTO[] | null>;
  findApartmentName(prefix: string): Promise<IApartmentDTO[] | null>;
  findApartmentById(id: number): Promise<ApartmentEntity | null>;
}

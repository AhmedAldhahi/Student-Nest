import { ApartmentEntity } from "../../AggregatesRoot/apartmentEntity.entity";

export interface IReadApartmentRepo {
  findAllApartment(): Promise<ApartmentEntity[] | null>;
}

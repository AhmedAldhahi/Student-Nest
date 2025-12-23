import { ApartmentAggregateRoot } from "../../AggregatesRoot/apartmentEntity.entity";

export interface IWriteApartmentRepo {
  updateApartment(apartment: ApartmentAggregateRoot): Promise<void>;
  deleteApartmentById(id: number): Promise<void>;
}

import { ApartmentEntity } from "../../AggregatesRoot/apartmentEntity.entity";

export interface IWriteApartmentRepo {
  updateApartment(apartment: ApartmentEntity): Promise<void>;
  deleteApartmentById(id: number): Promise<void>;
}

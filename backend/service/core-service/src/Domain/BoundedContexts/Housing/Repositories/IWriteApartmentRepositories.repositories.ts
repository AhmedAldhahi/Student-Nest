import { ApartmentAggregateRoot } from "../AgregateRoot/apartmentEntity.entity";

export interface IWriteApartmentRepo {
  InsertApartment(apartment: ApartmentAggregateRoot): Promise<void>;
  updateApartment(apartment: ApartmentAggregateRoot): Promise<void>;

  deleteApartmentById(id: string, userId: string): Promise<void>;
  deleteApartmentByIdForLandlord(id: string, userId: string): Promise<void>;
}

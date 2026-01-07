import { ILeaseEntityDTO } from "../../../../../Application/DTO/admin/LeaseDTO.dto";
import { LeaseAggregateRoot } from "../../AgregateRoot/leaseEntity.entity";

export interface IReadLeaseRepositories {
  findByQuery(query: string): Promise<ILeaseEntityDTO[] | null>;
  findAll(): Promise<ILeaseEntityDTO[] | null>;

  findLeaseForLandlordForSingleApartmentById(
    userId: string,
    apartmentId: string,
    leaseId: string
  ): Promise<LeaseAggregateRoot | null>;

  findAllLeaseForLandlordForSingleApartment(
    userId: string,
    apartmentId: string
  ): Promise<ILeaseEntityDTO[] | null>;

  findAllLeaseForLandlordForSingleApartmentByQueries(
    userId: string,
    apartmentId: string,
    queries: string
  ): Promise<ILeaseEntityDTO[] | null>;

  findAllLeaseForLandlord(userId: string): Promise<ILeaseEntityDTO[] | null>;

  findLeaseForLandlordById(
    userId: string,
    id: string
  ): Promise<ILeaseEntityDTO | null>;

  findAllLeaseForLandlordSearch(
    userId: string,
    query: string
  ): Promise<ILeaseEntityDTO[] | null>;
}

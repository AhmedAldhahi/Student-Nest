import { LeaseRequestEntity } from "../../Entities/leaseRequestEntity.entity";
import { ILeaseRequestDTO } from "../../Representations/ILeaseRequestDTO";

export interface IReadLeaseRequestRepositories {
  findAllLeaseRequest(): Promise<ILeaseRequestDTO[] | null>;
  findLeaseRequestByQuery(query: string): Promise<ILeaseRequestDTO[] | null>;

  findAllLeaseRequestForLandlord(
    userId: string,
  ): Promise<ILeaseRequestDTO[] | null>;

  findLeaseRequestForApartment(
    leaseRequestId: string,
  ): Promise<LeaseRequestEntity | null>;

  SearchForLeaseRequestForLandlord(
    userId: string,
    queries: string,
  ): Promise<ILeaseRequestDTO[] | null>;

  findLeaseRequestByIdForLandlord(
    userId: string,
    id: string,
  ): Promise<LeaseRequestEntity | null>;

  findAllLeaseRequestForLandlordForSingleApartment(
    userId: string,
    apartmentId: string,
  ): Promise<ILeaseRequestDTO[] | null>;

  SearchForLeaseRequestForLandlordForSingleApartment(
    userId: string,
    apartmentId: string,
    queries: string,
  ): Promise<ILeaseRequestDTO[] | null>;

  findAllLeaseRequestForStudent(
    userId: string,
  ): Promise<ILeaseRequestDTO[] | null>;

  

  SearchForLeaseRequestForStudent(
    userId: string,
    queries: string,
  ): Promise<ILeaseRequestDTO[] | null>;
}

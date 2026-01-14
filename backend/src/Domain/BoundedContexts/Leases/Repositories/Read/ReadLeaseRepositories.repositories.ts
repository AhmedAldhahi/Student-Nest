import { LeaseAggregateRoot } from "../../AgregateRoot/leaseEntity.entity";

export interface ILeaseEntityDTO {
  leaseId: string;
  LeaseActivationStatus: boolean;
  isLandlordSigned: boolean;
  isStudentSigned: boolean;
  houseRule: string;
  leaseStartDate: string;
  leaseEndDate: string;
  monthlyRent: string;
  leaseTerm: string;
  includeUtilities?: string;
  createAt: Date;
  landlordName: string;
  studentName: string;
  apartmentTitle: string;
  apartmentId: string;
}

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

  countActiveLeasesByApartmentId(apartmentId: string): Promise<number>;
}

import { LeaseRequestEntity } from "../../Entities/leaseRequestEntity.entity";

export interface ILeaseRequestDTO {
  requestLeaseId: string;
  requestMessage: string;
  startDate: string;
  rentTerm: string;
  requestStatus: string;
  createAt: Date;
  studentName: string;
  landlordName: string;
  Major: string;
  apartmentPrice: string;
  apartmentTitle: string;

  // price  ? do u want me to add to db
  //TODO: need to add end date
}


export interface IReadLeaseRequestRepositories {
  findAllLeaseRequest(): Promise<ILeaseRequestDTO[] | null>;
  findLeaseRequestByQuery(query: string): Promise<ILeaseRequestDTO[] | null>;

  findAllLeaseRequestForLandlord(
    userId: string
  ): Promise<ILeaseRequestDTO[] | null>;

  SearchForLeaseRequestForLandlord(
    userId: string,
    queries: string
  ): Promise<ILeaseRequestDTO[] | null>;

  findLeaseRequestByIdForLandlord(
    userId: string,
    id: string
  ): Promise<LeaseRequestEntity | null>;

  findAllLeaseRequestForLandlordForSingleApartment(
    userId: string,
    apartmentId: string
  ): Promise<ILeaseRequestDTO[] | null>;

  SearchForLeaseRequestForLandlordForSingleApartment(
    userId: string,
    apartmentId: string,
    queries: string
  ): Promise<ILeaseRequestDTO[] | null>;
}

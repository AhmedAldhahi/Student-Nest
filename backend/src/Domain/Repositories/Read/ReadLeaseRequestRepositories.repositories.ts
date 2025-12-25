import { ILeaseRequestDTO } from "../../../Application/DTO/admin/LeaseRequestDTO.dto";

export interface IReadLeaseRequestRepositories {
  findAllLeaseRequest(): Promise<ILeaseRequestDTO[] | null>;
  findLeaseRequestByQuery(query: string): Promise<ILeaseRequestDTO | null>;
}

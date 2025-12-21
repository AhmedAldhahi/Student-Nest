import { ILeaseRequestDTO } from "../../../Application/Dtos/admin/LeaseRequestDTO.dtos";

export interface IReadLeaseRequestRepositories {
  findAllLeaseRequest(): Promise<ILeaseRequestDTO[] | null>;
  findLeaseRequestById(id: number): Promise<ILeaseRequestDTO | null>;
}

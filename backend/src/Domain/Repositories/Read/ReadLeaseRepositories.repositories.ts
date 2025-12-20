import { ILeaseEntityDTO } from "../../../Application/Dtos/admin/LeaseDTO.dtos";

export interface IReadLeaseRepositories {
  findById(id: number): Promise<ILeaseEntityDTO | null>;
  findAll(): Promise<ILeaseEntityDTO[] | null>;
}

import { ILeaseEntityDTO } from "../../../Application/Dtos/admin/LeaseDTO.dtos";

export interface IReadLeaseRepositories {
  findById(id: number): Promise<ILeaseEntityDTO | null>;
  findAll(): Promise<ILeaseEntityDTO[] | null>;

  // need more data about what jameel refer to name
}

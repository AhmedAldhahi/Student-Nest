import { ILeaseEntityDTO } from "../../../Application/DTO/admin/LeaseDTO.dtos";

export interface IReadLeaseRepositories {
  findByQuery(query: string): Promise<ILeaseEntityDTO | null>;
  findAll(): Promise<ILeaseEntityDTO[] | null>;
  

}

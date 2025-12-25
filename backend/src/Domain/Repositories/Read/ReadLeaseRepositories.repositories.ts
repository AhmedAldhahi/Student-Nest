import { ILeaseEntityDTO } from "../../../Application/DTO/admin/LeaseDTO.dto";

export interface IReadLeaseRepositories {
  findByQuery(query: string): Promise<ILeaseEntityDTO | null>;
  findAll(): Promise<ILeaseEntityDTO[] | null>;
  

}

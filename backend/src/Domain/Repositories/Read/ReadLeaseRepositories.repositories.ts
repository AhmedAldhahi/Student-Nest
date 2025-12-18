import { LeaseEntity } from "../../Entities/leaseEntity.entity";

export interface IReadLeaseRepositories {
  findByName(name: string): Promise<LeaseEntity | null>;
  findAll(): Promise<LeaseEntity[] | null>;
} 



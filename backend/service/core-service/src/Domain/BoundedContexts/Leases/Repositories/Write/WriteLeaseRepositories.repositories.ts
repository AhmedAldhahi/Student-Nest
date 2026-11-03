import { LeaseAggregateRoot } from "../../AgregateRoot/leaseEntity.entity";

export interface IWriteLeaseRepo {
  createLease(lease: LeaseAggregateRoot): Promise<void>;
  updateLease(lease: LeaseAggregateRoot): Promise<void>;
}

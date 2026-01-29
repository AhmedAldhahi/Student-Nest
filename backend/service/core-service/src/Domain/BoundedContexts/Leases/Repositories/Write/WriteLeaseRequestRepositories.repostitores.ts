import { LeaseRequestEntity } from "../../Entities/leaseRequestEntity.entity";

export interface IWriteLeaseRequestRepo {
  updateLeaseRequest(LeaseRequest: LeaseRequestEntity): Promise<void>;
  createLeaseRequest(leaseRequest: LeaseRequestEntity): Promise<void>;
}

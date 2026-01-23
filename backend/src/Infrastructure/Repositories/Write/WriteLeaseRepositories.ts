import { EntityManager } from "typeorm";
import { LeaseAggregateRoot } from "../../../Domain/BoundedContexts/Leases/AgregateRoot/leaseEntity.entity";
import { IWriteLeaseRepo } from "../../../Domain/BoundedContexts/Leases/Repositories/Write/WriteLeaseRepositories.repositories";
import { LeaseMapper } from "../mapper/lease.mapper";
import { LeaseModel } from "../../Database/TypeOrm/entity/Lease.entity";

export class WriteLeaseRepositories implements IWriteLeaseRepo {
  constructor(private readonly manager: EntityManager) {}

  public async createLease(lease: LeaseAggregateRoot): Promise<void> {
    const model = LeaseMapper.toModel(lease);
    await this.manager.save(LeaseModel, model);
  }
}

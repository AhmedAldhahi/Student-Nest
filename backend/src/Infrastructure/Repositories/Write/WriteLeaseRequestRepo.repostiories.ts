import { EntityManager } from "typeorm";
import { LeaseRequestEntity } from "../../../Domain/Modules/Leases/Entities/leaseRequestEntity.entity";
import { IWriteLeaseRequestRepo } from "../../../Domain/Modules/Leases/Repositories/Write/WriteLeaseRequestRepositories.repostitores";
import { LeaseRequestMapper } from "../mapper/leaseRequest.mapper";
import { LeaseRequestModel } from "../../Database/orm/TypeOrm/entity/LeaseRequest";

export class WriteLeastRequestRepositories implements IWriteLeaseRequestRepo {
  private manager: EntityManager;

  constructor(manager: EntityManager) {
    this.manager = manager;
  }

  public async updateLeaseRequest(
    LeaseRequest: LeaseRequestEntity
  ): Promise<void> {
    const model = LeaseRequestMapper.toModel(LeaseRequest);
    await this.manager.save(LeaseRequestModel, model);
  }
}

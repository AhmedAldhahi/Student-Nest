import { EntityManager } from "typeorm";
import { LeaseAggregateRoot } from "../../../Domain/BoundedContexts/Leases/AgregateRoot/leaseEntity.entity";
import { IWriteLeaseRepo } from "../../../Domain/BoundedContexts/Leases/Repositories/Write/WriteLeaseRepositories.repositories";
import { LeaseMapper } from "../mapper/lease.mapper";
import { LeaseModel } from "../../Database/TypeOrm/entity/Lease.entity";

export class WriteLeaseRepositories implements IWriteLeaseRepo {
  constructor(private readonly manager: EntityManager) {}

  public async updateLease(lease: LeaseAggregateRoot): Promise<void> {
    try {
      const model = LeaseMapper.toModel(lease);
      (model as any).payments = undefined;

      await this.manager.update(
        LeaseModel,
        { leaseId: model.leaseId },
        {
          leaseStartDate: model.leaseStartDate,
          leaseEndDate: model.leaseEndDate,
          houseRule: model.houseRule,
          isLandlordSigned: model.isLandlordSigned,
          isStudentSigned: model.isStudentSigned,
          monthlyRent: model.monthlyRent,
          LeaseActivationStatus: model.LeaseActivationStatus,
          includeUtilities: model.includeUtilities,
          createAt: model.createAt,
        },
      );
    } catch (error: any) {
      console.error("Error updating lease:", error);
      throw error;
    }
  }

  public async createLease(lease: LeaseAggregateRoot): Promise<void> {
    try {
      const model = LeaseMapper.toModel(lease);
      await this.manager.save(LeaseModel, model);
    } catch (error: any) {
      console.error("Error create lease:", error);
      throw new Error("Failed to create lease .");
    }
  }
}

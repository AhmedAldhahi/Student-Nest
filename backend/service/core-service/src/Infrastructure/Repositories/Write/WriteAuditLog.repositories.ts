import { EntityManager } from "typeorm";
import { AuditLogEntity } from "../../../Domain/BoundedContexts/adminstration/Entities/auditlogEntity.entity";
import { AuditLogMapper } from "../mapper/auditlog.mapper";
import { AuditLogModel } from "../../Database/TypeOrm/entity/AuditLog.entity";
import { IWriteAuditLogRepositories } from "../../../Domain/BoundedContexts/adminstration/Repositories/IWriteAuditLogRepo.repositories";

export class WriteAuditLogRepositories implements IWriteAuditLogRepositories {
  constructor(private readonly manager: EntityManager) {}

  async createLog(log: AuditLogEntity): Promise<void> {
    const model = AuditLogMapper.toModel(log);
    await this.manager.save(AuditLogModel, model);
  }
}

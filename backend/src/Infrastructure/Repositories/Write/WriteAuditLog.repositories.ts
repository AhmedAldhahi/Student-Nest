import { EntityManager } from "typeorm";
import { AuditLogEntity } from "../../../Domain/Modules/adminstration/Entities/auditlogEntity.entity";
import { AuditLogMapper } from "../mapper/auditlog.mapper";
import { AuditLogModel } from "../../Database/orm/TypeOrm/entity/AuditLog.entity";
import { IWriteAuditLogRepositories } from "../../../Domain/Modules/adminstration/Entities/IWriteAuditLogRepo.repositories";

export class WriteAuditLogRepositories implements IWriteAuditLogRepositories {
  constructor(private readonly manager: EntityManager) {}

  async createLog(log: AuditLogEntity): Promise<void> {
    const model = AuditLogMapper.toModel(log);
    await this.manager.save(AuditLogModel, model);
  }
}

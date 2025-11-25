import { EntityManager } from "typeorm";
import { AuditLogEntity } from "../../Core/entites/auditlogEntity.entity";
import { IAuditLogRepositories } from "../../Core/repositories/AuditLogRepositories.repositories";
import { AuditLogMapper } from "./auditlog.mapper";
import { AuditLogModel } from "../database/orm/TypeOrm/entity/AuditLog.entity";

export class AuditLogRepositories implements IAuditLogRepositories {
  constructor(private readonly manager: EntityManager) {}

  async createLog(log: AuditLogEntity): Promise<void> {
    const model = AuditLogMapper.toModel(log);
    await this.manager.save(AuditLogModel, model);
  }
  findAll(): Promise<AuditLogEntity[]> {
    throw new Error("Method not implemented.");
  }
  findByUserEmail(email: string): Promise<AuditLogEntity[]> {
    throw new Error("Method not implemented.");
  }
}

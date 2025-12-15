import { EntityManager } from "typeorm";
import { AuditLogEntity } from "../../Domain/Entites/auditlogEntity.entity";
import { IAuditLogRepositories } from "../../Domain/Repositories/AuditLogRepositories.repositories";
import { AuditLogMapper } from "./auditlog.mapper";
import { AuditLogModel } from "../Database/orm/TypeOrm/entity/AuditLog.entity";

export class AuditLogRepositories implements IAuditLogRepositories {
  constructor(private readonly manager: EntityManager) { }

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

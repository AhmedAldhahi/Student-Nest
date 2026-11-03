import { AuditLogEntity } from "../Entities/auditlogEntity.entity";

export interface IWriteAuditLogRepositories {
  createLog(log: AuditLogEntity): Promise<void>;
}

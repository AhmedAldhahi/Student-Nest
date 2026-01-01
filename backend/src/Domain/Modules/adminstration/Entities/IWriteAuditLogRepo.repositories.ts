import { AuditLogEntity } from "./auditlogEntity.entity";

export interface IWriteAuditLogRepositories {
  createLog(log: AuditLogEntity): Promise<void>;
}

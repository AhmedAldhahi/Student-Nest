import { AuditLogEntity } from "../entites/auditlogEntity.entity";

export interface IAuditLogRepositories {
  createLog(log: AuditLogEntity): Promise<void>;
  findAll(): Promise<AuditLogEntity[]>;

  findByUserEmail(email: string): Promise<AuditLogEntity[]>;
}

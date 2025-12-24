import { AuditLogEntity } from "../../Entities/auditlogEntity.entity";

export interface IReadAuditLogRepositories {
  findAll(): Promise<AuditLogEntity[]>;

  findByUserEmail(email: string): Promise<AuditLogEntity[]>;
  
}

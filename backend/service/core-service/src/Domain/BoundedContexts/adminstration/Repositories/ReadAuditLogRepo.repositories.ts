import { AuditLogEntity } from "../Entities/auditlogEntity.entity";

export interface IReadAuditLogRepositories {
  findAll(): Promise<AuditLogEntity[]>;

  findByUserQuery(Query: string): Promise<AuditLogEntity[]>;
  
}

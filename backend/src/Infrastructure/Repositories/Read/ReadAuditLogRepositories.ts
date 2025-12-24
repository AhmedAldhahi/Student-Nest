import { AuditLogEntity } from "../../../Domain/Entities/auditlogEntity.entity";
import { IReadAuditLogRepositories } from "../../../Domain/Repositories/Read/ReadAuditLogRepo.repositories";

export class ReadAuditLogRepositories implements IReadAuditLogRepositories {
    
  public async findAll(): Promise<AuditLogEntity[]> {
    throw new Error("Method not implemented.");
  }

  public async findByUserEmail(email: string): Promise<AuditLogEntity[]> {
    throw new Error("Method not implemented.");
  }
}

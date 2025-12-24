import { AuditLogEntity } from "../../../Domain/Entities/auditlogEntity.entity";
import { IReadAuditLogRepositories } from "../../../Domain/Repositories/Read/ReadAuditLogRepo.repositories";
import { AppDataSource } from "../../Database/orm/TypeOrm/data-source";
import { AuditLogModel } from "../../Database/orm/TypeOrm/entity/AuditLog.entity";
import { AuditLogMapper } from "../mapper/auditlog.mapper";

export class ReadAuditLogRepositories implements IReadAuditLogRepositories {
  public async findAll(): Promise<AuditLogEntity[]> {
    try {
      const auditLogModels = await AppDataSource.getInstance()
        .getRepository(AuditLogModel)
        .find({
          select: {
            logID: true,
            actionType: true,
            description: true,
            actionTimestamp: true,
            record: true,
            ipAddress: true,
            deviceInfo: true,
            location: true,
            fieldName: true,
            oldValue: true,
            newValue: true,

            targetUserId: true,
            targetUserName: true,
            targetUserRole: true,

            performedByUserId: true,
            performedByUserName: true,
            performedByUserRole: true,
          },
        });

      if (!auditLogModels || auditLogModels.length === 0) return [];

      return auditLogModels.map((orm) => {
        return AuditLogMapper.toEntity(orm);
      });
    } catch (error: any) {
      console.error("fail to get all students", error);
      throw error;
    }
  }

  public async findByUserEmail(email: string): Promise<AuditLogEntity[]> {
    throw new Error("Method not implemented.");
  }
}

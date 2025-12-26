import { FindOptionsWhere, Like } from "typeorm";
import { AuditLogEntity } from "../../../Domain/Entities/auditlogEntity.entity";
import { IReadAuditLogRepositories } from "../../../Domain/Repositories/Read/ReadAuditLogRepo.repositories";
import { AppDataSource } from "../../Database/orm/TypeOrm/data-source";
import { AuditLogModel } from "../../Database/orm/TypeOrm/entity/AuditLog.entity";
import { AuditLogMapper } from "../mapper/auditlog.mapper";
import { UserRole } from "../../../Domain/Enum/UserRole.enum";

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

  public async findByUserQuery(query: string): Promise<AuditLogEntity[]> {
    try {
      const isUUID =
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
          query
        );

      const whereConditions: FindOptionsWhere<AuditLogModel>[] = [
        { ipAddress: Like(`%${query}%`) },
        { deviceInfo: Like(`%${query}%`) },
        { description: Like(`%${query}%`) },
        { performedByUserName: Like(`%${query}%`) },
        { targetUserName: Like(`%${query}%`) },
        { location: Like(`%${query}%`) },
        { record: Like(`%${query}%`) },
      ];

      const matchedRole = Object.values(UserRole).find((role) =>
        role.includes(query.toUpperCase())
      );

      if (matchedRole) {
        whereConditions.push({ performedByUserRole: matchedRole });
        whereConditions.push({ targetUserRole: matchedRole });
      }

      if (isUUID) {
        whereConditions.push({ logID: query as any });
        whereConditions.push({ targetUserId: query as any });
        whereConditions.push({ performedByUserId: query as any });
      }

      const orm = await AppDataSource.getInstance()
        .getRepository(AuditLogModel)
        .find({
          where: whereConditions,
          order: { actionTimestamp: "DESC" },
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

      if (!orm || orm.length === 0) return [];

      return orm.map((data) => {
        return AuditLogMapper.toEntity(data);
      });
    } catch (error: any) {
      console.error("fail to search audit logs", error);
      throw error;
    }
  }
}

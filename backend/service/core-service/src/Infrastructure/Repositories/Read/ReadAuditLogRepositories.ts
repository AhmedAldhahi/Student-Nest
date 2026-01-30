import { FindOptionsWhere, Like } from "typeorm";
import { AuditLogEntity } from "../../../Domain/BoundedContexts/adminstration/Entities/auditlogEntity.entity";
import { IReadAuditLogRepositories } from "../../../Domain/BoundedContexts/adminstration/Repositories/ReadAuditLogRepo.repositories";
import { AuditLogMapper } from "../mapper/auditlog.mapper";
import { UserRole } from "../../../Domain/Shared/Enum/UserRole.enum";
import { AppDataSource } from "../../Database/TypeOrm/data-source";
import { AuditLogModel } from "../../Database/TypeOrm/entity/AuditLog.entity";

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

            performedByUserId: true,
          },
          relations: {
            targetUser: true,
            performedByUser: true,
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
      const trimmedQuery = query.trim();
      const isUUID =
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
          trimmedQuery
        );

      // 1. Basic Text Search (On AuditLog Table)
      const whereConditions: FindOptionsWhere<AuditLogModel>[] = [
        { ipAddress: Like(`%${trimmedQuery}%`) },
        { deviceInfo: Like(`%${trimmedQuery}%`) },
        { description: Like(`%${trimmedQuery}%`) },
        { location: Like(`%${trimmedQuery}%`) },
        { record: Like(`%${trimmedQuery}%`) },

        { targetUser: { Name: Like(`%${trimmedQuery}%`) } },
        { targetUser: { Email: Like(`%${trimmedQuery}%`) } },
        { performedByUser: { Name: Like(`%${trimmedQuery}%`) } },
      ];

      // 3. Handle Role Search
      // (Your previous code calculated matchedRole but didn't use it)
      const matchedRole = Object.values(UserRole).find((role) =>
        role.toLowerCase().includes(trimmedQuery.toLowerCase())
      );

      if (matchedRole) {
        whereConditions.push({ targetUser: { Role: matchedRole } });
        whereConditions.push({ performedByUser: { Role: matchedRole } });
      }

      // 4. Handle UUID Search
      if (isUUID) {
        whereConditions.push({ logID: trimmedQuery });
        whereConditions.push({ targetUserId: trimmedQuery });
        whereConditions.push({ performedByUserId: trimmedQuery });
      }

      const orm = await AppDataSource.getInstance()
        .getRepository(AuditLogModel)
        .find({
          where: whereConditions, // Executes OR logic across all these fields
          order: { actionTimestamp: "DESC" },

          relations: {
            targetUser: true,
            performedByUser: true,
          },

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
            performedByUserId: true,
            // Select nested fields for performance
            targetUser: {
              Name: true,
              Role: true,
              Email: true,
            },
            performedByUser: {
              Name: true,
              Role: true,
            },
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

import { AuditLogEntity } from "../../../Domain/Entities/auditlogEntity.entity";
import { UserRole } from "../../../Domain/Enum/UserRole.enum";
import { AuditLogModel } from "../../Database/orm/TypeOrm/entity/AuditLog.entity";

export class AuditLogMapper {
  public static toModel(auditEntity: AuditLogEntity): AuditLogModel {
    const auditModel = new AuditLogModel();

    auditModel.logID = auditEntity.getLogID();
    auditModel.actionType = auditEntity.getActionType();
    auditModel.actionTimestamp = auditEntity.getActionTimestamp();
    auditModel.description = auditEntity.getDescription();

    auditModel.targetUserId = auditEntity.getTargetUserId();

    auditModel.record = auditEntity.getRecord();
    auditModel.fieldName = auditEntity.getFieldName();
    auditModel.oldValue = auditEntity.getOldValue();
    auditModel.newValue = auditEntity.getNewValue();
    auditModel.ipAddress = auditEntity.getIpAddress();
    auditModel.deviceInfo = auditEntity.getDeviceInfo();
    auditModel.location = auditEntity.getLocation();
    auditModel.performedByUserId = auditEntity.getPerformedByUserId();

    return auditModel;
  }

  public static toEntity(auditModel: AuditLogModel): AuditLogEntity {
    return new AuditLogEntity({
      actionType: auditModel.actionType,
      actionTimestamp: auditModel.actionTimestamp,
      description: auditModel.description,
      deviceInfo: auditModel.deviceInfo,
      fieldName: auditModel.fieldName,
      ipAddress: auditModel.ipAddress,
      location: auditModel.location,
      newValue: auditModel.newValue,
      oldValue: auditModel.oldValue,
      record: auditModel.record,
      targetUserId: auditModel.targetUserId,

      targetUserName: auditModel.targetUser?.Name || "Unknown/Deleted User",
      targetUserRole: auditModel.targetUser?.Role || UserRole.student,

      logId: auditModel.logID,
      performedByUserId: auditModel.performedByUserId,

      performedByUserName: auditModel.performedByUser?.Name ?? null,

      performedByUserRole: auditModel.performedByUser?.Role ?? null,
    });
  }
}

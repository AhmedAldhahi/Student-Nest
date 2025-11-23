import { AuditLogEntity } from "../../../Core/entites/auditlogEntity.entity";
import { AuditLogModel } from "../orm/TypeOrm/entity/AuditLog.entity";

export class AuditLogMapper {
  public static toModel(auditEntity: AuditLogEntity): AuditLogModel {
    const auditModel = new AuditLogModel();

    auditModel.logID = auditEntity.getLogID();
    auditModel.actionType = auditEntity.getActionType();
    auditModel.actionTimestamp = auditEntity.getActionTimestamp();
    auditModel.description = auditEntity.getDescription();

    auditModel.targetUserId = auditEntity.getTargetUserId();
    auditModel.targetUserName = auditEntity.getTargetUserName();
    auditModel.targetUserRole = auditEntity.getTargetUserRole();

    auditModel.record = auditEntity.getRecord();
    auditModel.fieldName = auditEntity.getFieldName();
    auditModel.oldValue = auditEntity.getOldValue();
    auditModel.newValue = auditEntity.getNewValue();
    auditModel.ipAddress = auditEntity.getIpAddress();
    auditModel.deviceInfo = auditEntity.getDeviceInfo();
    auditModel.location = auditEntity.getLocation();
    auditModel.performedByUserId = auditEntity.getPerformedByUserId();
    auditModel.performedByUserName = auditEntity.getPerformedByUserName();
    auditModel.performedByUserRole = auditEntity.getPerformedByUserRole();

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
      targetUserName: auditModel.targetUserName,
      targetUserRole: auditModel.targetUserRole,

      logId: auditModel.logID,
      performedByUserId: auditModel.performedByUserId,
      performedByUserName: auditModel.performedByUserName,
      performedByUserRole: auditModel.performedByUserRole,
    });
  }
}

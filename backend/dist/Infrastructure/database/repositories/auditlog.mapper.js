"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLogMapper = void 0;
const auditlogEntity_entity_1 = require("../../../Core/entites/auditlogEntity.entity");
const AuditLog_entity_1 = require("../orm/TypeOrm/entity/AuditLog.entity");
class AuditLogMapper {
    static toModel(auditEntity) {
        const auditModel = new AuditLog_entity_1.AuditLogModel();
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
    static toEntity(auditModel) {
        return new auditlogEntity_entity_1.AuditLogEntity({
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
exports.AuditLogMapper = AuditLogMapper;

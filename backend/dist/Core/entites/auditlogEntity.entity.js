"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLogEntity = void 0;
class AuditLogEntity {
    constructor(data) {
        this.actionType = data.actionType;
        this.actionTimestamp = data.actionTimestamp;
        this.description = data.description;
        this.deviceInfo = data.deviceInfo;
        this.fieldName = data.fieldName;
        this.ipAddress = data.ipAddress;
        this.location = data.location;
        this.newValue = data.newValue;
        this.oldValue = data.oldValue;
        this.record = data.record;
        this.targetUserId = data.targetUserId;
        this.targetUserName = data.targetUserName;
        this.targetUserRole = data.targetUserRole;
        this.logId = data.logId;
        this.performedByUserId = data.performedByUserId;
        this.performedByUserName = data.performedByUserName;
        this.performedByUserRole = data.performedByUserRole;
    }
    getActionType() {
        return this.actionType;
    }
    getActionTimestamp() {
        return this.actionTimestamp;
    }
    getDescription() {
        return this.description;
    }
    getLogID() {
        return this.logId;
    }
    getTargetUserId() {
        return this.targetUserId;
    }
    getTargetUserName() {
        return this.targetUserName;
    }
    getTargetUserRole() {
        return this.targetUserRole;
    }
    getRecord() {
        return this.record;
    }
    getOldValue() {
        return this.oldValue ?? null;
    }
    getNewValue() {
        return this.newValue ?? null;
    }
    getIpAddress() {
        return this.ipAddress;
    }
    getDeviceInfo() {
        return this.deviceInfo;
    }
    getLocation() {
        return this.location;
    }
    getPerformedByUserId() {
        return this.performedByUserId;
    }
    getPerformedByUserName() {
        return this.performedByUserName;
    }
    getPerformedByUserRole() {
        return this.performedByUserRole;
    }
    getFieldName() {
        return this.fieldName;
    }
}
exports.AuditLogEntity = AuditLogEntity;

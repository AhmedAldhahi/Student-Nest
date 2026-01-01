import { AuditLogActionType } from "../../../Shared/Enum/AuditLogAction.enum";
import { UserRole } from "../../../Shared/Enum/UserRole.enum";

interface AuditLogData {
  logId: string;
  actionType: AuditLogActionType;
  actionTimestamp: Date;
  description: string;
  targetUserId: string;
  targetUserName: string;
  targetUserRole: UserRole;
  record: string;
  fieldName: Record<string, any>;
  oldValue?: Record<string, any> | null;
  newValue?: Record<string, any> | null;
  ipAddress: string;
  deviceInfo: string;
  location: string;
  performedByUserId: string | null;
  performedByUserName: string | null;
  performedByUserRole: UserRole | null;
}

export class AuditLogEntity {
  private logId: string;
  private actionType: AuditLogActionType;
  private actionTimestamp: Date;
  private description: string;
  private targetUserId: string;
  private targetUserName: string;
  private targetUserRole: UserRole;
  private record: string;
  private fieldName: Record<string, any>;
  private oldValue?: Record<string, any> | null;
  private newValue?: Record<string, any> | null;
  private ipAddress: string;
  private deviceInfo: string;
  private location: string;
  private performedByUserId: string | null;
  private performedByUserName: string | null;
  private performedByUserRole: UserRole | null;

  constructor(data: AuditLogData) {
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

  public getActionType(): AuditLogActionType {
    return this.actionType;
  }

  public getActionTimestamp(): Date {
    return this.actionTimestamp;
  }

  public getDescription(): string {
    return this.description;
  }

  public getLogID(): string {
    return this.logId;
  }

  public getTargetUserId(): string {
    return this.targetUserId;
  }

  public getTargetUserName(): string {
    return this.targetUserName;
  }

  public getTargetUserRole(): UserRole {
    return this.targetUserRole;
  }

  public getRecord(): string {
    return this.record;
  }

  public getOldValue(): Record<string, any> | null {
    return this.oldValue ?? null;
  }

  public getNewValue(): Record<string, any> | null {
    return this.newValue ?? null;
  }

  public getIpAddress(): string {
    return this.ipAddress;
  }

  public getDeviceInfo(): string {
    return this.deviceInfo;
  }

  public getLocation(): string {
    return this.location;
  }

  public getPerformedByUserId(): string | null {
    return this.performedByUserId ?? null;
  }

  public getPerformedByUserName(): string | null {
    return this.performedByUserName ?? null;
  }

  public getPerformedByUserRole(): UserRole | null {
    return this.performedByUserRole ?? null;
  }

  public getFieldName(): Record<string, any> {
    return this.fieldName;
  }
}

import { AuditLogActionType } from "../../Domain/Shared/Enum/AuditLogAction.enum";

export interface IAuditLogRequest {
  logId: string;
  actionType: AuditLogActionType;
  description: string;
  actionTimestamp: Date;
  
  targetUserId: string;
  targetUserName: string;
  targetUserRole: string;

  performedByUserId: string;
  performedByUserName: string;
  performedByUserRole: string;

  record: string;
  fieldName: Record<string, any>;
  oldValue?: Record<string, any>;
  newValue?: Record<string, any>;

  ipAddress: string;
  deviceInfo: string;
  location: string;

  // fk for admin
}

import { AuditLogActionType } from "../Enum/AuditLogAction.enum";
import { UserRole } from "../../../Shared/Enum/UserRole.enum";

export type  AuditLogDataType =  {
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
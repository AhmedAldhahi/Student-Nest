import { AuditLogEntity } from "../entites/auditlogEntity.entity";
import { AuditLogActionType } from "../enum/AuditLogAction.enum";
import { UserRole } from "../enum/UserRole.enum";

export interface IAuditLogRepositories {
  createLog(log: AuditLogEntity): Promise<void>;
  findAll(): Promise<AuditLogEntity[]>;
  findById(id: string): Promise<AuditLogEntity[]>;

  findByActionType(actionType: AuditLogActionType): Promise<AuditLogEntity[]>;
  findByTimestamp(time: Date): Promise<AuditLogEntity[]>;

  findByUserEmail(email: string): Promise<AuditLogEntity[]>;
  findByUserRole(role: UserRole): Promise<AuditLogEntity[]>;

  findByIPAddress(ip: string): Promise<AuditLogEntity[]>;
  findByLocation(location: string): Promise<AuditLogEntity[]>;
  findByDeviceInfo(deviceInfo: string): Promise<AuditLogEntity[]>;

  findByPerformedByUserId(id: string): Promise<AuditLogEntity[]>;
  findByPerformedByEmail(email: string): Promise<AuditLogEntity[]>;
  findByPerformedByRole(role: UserRole): Promise<AuditLogEntity[]>;
}




import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";
import { AuditLogActionType } from "../../../../../Domain/Enum/AuditLogAction.enum";
import { UserRole } from "../../../../../Domain/Enum/UserRole.enum";

@Entity("AuditLog")
export class AuditLogModel {
  @PrimaryGeneratedColumn("uuid")
  logID: string;

  @Column({ type: "enum", enum: AuditLogActionType })
  actionType: AuditLogActionType;

  @Column({ type: "varchar", length: 255 })
  description: string;

  @CreateDateColumn({ type: "timestamp" })
  actionTimestamp: Date;

  @Column({ type: "varchar", length: 36 })
  targetUserId: string;

  @Column({ type: "varchar", length: 150 })
  targetUserName: string;

  @Column({ type: "enum", enum: UserRole })
  targetUserRole: UserRole;

  @Column({ type: "varchar", length: 36, nullable: true })
  performedByUserId: string | undefined;

  @Column({ type: "varchar", length: 150, nullable: true })
  performedByUserName: string | undefined;

  @Column({ type: "enum", enum: UserRole, nullable: true })
  performedByUserRole: UserRole | undefined;

  @Column({ type: "varchar", length: 100 })
  record: string;

  @Column({ type: "json" })
  fieldName: Record<string, any>;

  @Column({ type: "json", nullable: true })
  oldValue: Record<string, any> | null;

  @Column({ type: "json", nullable: true })
  newValue: Record<string, any> | null;

  @Column({ type: "varchar", length: 100 })
  ipAddress: string;

  @Column({ type: "varchar", length: 150 })
  deviceInfo: string;

  @Column({ type: "varchar", length: 80 })
  location: string;
}

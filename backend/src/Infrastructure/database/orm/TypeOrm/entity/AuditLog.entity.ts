import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { AdminModel } from "./Admin.entity";
import { AuditLogActionType } from "../../../../../Core/enum/AuditLogAction.enum";
import { UserRole } from "../../../../../Core/enum/UserRole.enum";

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

  @Column({ type: "varchar", length: 36 })
  performedByUserId: string;

  @Column({ type: "varchar", length: 150 })
  performedByUserName: string;

  @Column({ type: "enum", enum: UserRole })
  performedByUserRole: UserRole;

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

  @ManyToOne(() => AdminModel, (admin) => admin.auditLogs, {
    onDelete: "SET NULL",
  })
  admin: AdminModel;
}

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { UserModel } from "./User.entity";
import { AdminModel } from "./Admin.entity";

export enum AuditActionType {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
}

@Entity("AuditLog")
export class AuditLogModel {
  @PrimaryGeneratedColumn("uuid")
  logID: string;

  @Column({ type: "enum", enum: AuditActionType })
  actionType: AuditActionType;

  @Column({ type: "varchar", length: 255 })
  description: string;

  @CreateDateColumn({ type: "timestamp" })
  actionTimestamp: Date;

  @ManyToOne(() => UserModel, { onDelete: "SET NULL" })
  targetUser: UserModel;

  @Column({ type: "varchar", length: 150 })
  targetUserName: string;

  @Column({ type: "varchar", length: 100 })
  record: string;

  @Column({ type: "varchar", length: 100 })
  fieldName: string;

  @Column({ type: "varchar", nullable: true })
  oldValue: string | null;

  @Column({ type: "varchar", nullable: true })
  newValue: string | null;

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

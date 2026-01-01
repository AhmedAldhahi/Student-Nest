import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { AuditLogActionType } from "../../../../../Domain/Shared/Enum/AuditLogAction.enum";
import { UserRole } from "../../../../../Domain/Shared/Enum/UserRole.enum";
import { UserModel } from "./User.entity";

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

  // 1. The Relation Object
  @ManyToOne(() => UserModel, {
    nullable: false, // Based on your previous code (was not nullable)
    onDelete: "CASCADE", // Or "SET NULL" if you want to keep logs after user delete
  })
  @JoinColumn({ name: "targetUserId" }) // Maps this relation to the column 'targetUserId'
  targetUser: UserModel;

  // 2. The Foreign Key Column (Optional but recommended for direct ID access)
  @Column({ type: "varchar", length: 36, nullable: false })
  targetUserId: string;

  // @Column({ type: "varchar", length: 150 })
  // targetUserName: string;

  // @Column({ type: "enum", enum: UserRole })
  // targetUserRole: UserRole;

  @ManyToOne(() => UserModel, {
    nullable: true,
    onDelete: "SET NULL", // If admin is deleted, keep the log but set ID to null
  })
  @JoinColumn({ name: "performedByUserId" })
  performedByUser: UserModel | null;

  // 2. The Foreign Key Column
  @Column({ type: "varchar", length: 36, nullable: true })
  performedByUserId: string | null;

  // @Column({ type: "varchar", length: 36, nullable: true })
  // performedByUserId: string | undefined;

  // @Column({ type: "varchar", length: 150, nullable: true })
  // performedByUserName: string | undefined;

  // @Column({ type: "enum", enum: UserRole, nullable: true })
  // performedByUserRole: UserRole | undefined;
  

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

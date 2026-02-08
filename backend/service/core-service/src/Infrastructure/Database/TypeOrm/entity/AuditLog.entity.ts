import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { AuditLogActionType } from "../../../../Domain/BoundedContexts/adminstration/Enum/AuditLogAction.enum";
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

  @ManyToOne(() => UserModel, {
    nullable: false, 
    onDelete: "CASCADE", 
  })
  @JoinColumn({ name: "targetUserId" }) 
  targetUser: UserModel;

  @Column({ type: "varchar", length: 36, nullable: false })
  targetUserId: string;

  @ManyToOne(() => UserModel, {
    nullable: true,
    onDelete: "SET NULL", 
  })
  @JoinColumn({ name: "performedByUserId" })
  performedByUser: UserModel | null;

  @Column({ type: "varchar", length: 36, nullable: true })
  performedByUserId: string | null;
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

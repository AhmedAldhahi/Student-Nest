import {
  Entity,
  OneToOne,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { UserModel } from "./User.entity";
import { AuditLogModel } from "./AuditLog.entity";

@Entity("admins")
export class AdminModel {
  @PrimaryColumn()
  adminId: string;

  @OneToOne(() => UserModel, { cascade: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: UserModel;

  @OneToMany(() => AuditLogModel, (auditLog) => auditLog.admin)
  auditLogs: AuditLogModel[];
}

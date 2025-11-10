import { Entity, Column, PrimaryColumn } from "typeorm";
import { UserRole } from "../../../../../Core/enum/UserRole.enum";
import { UserAccountStatus } from "../../../../../Core/enum/UserAccountStatus.enum";

@Entity("user")
export class User {
  [x: string]: any;
  @PrimaryColumn()
  userId: string; // made public

  @Column({ type: "varchar", length: 150, unique: true })
  Email: string; // made public

  @Column({ default: false })
  emailVerfied: boolean;

  @Column({ type: "varchar", length: 75 })
  Name: string;

  @Column({ type: "varchar", length: 150 })
  Password: string;

  @Column({ type: "enum", enum: UserRole })
  Role: UserRole;

  @Column({ type: "date" })
  DateOfBirth: Date;

  @Column({ type: "varchar", length: 15 })
  PhoneNumber: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  Photo?: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  Address?: string;

  @Column({
    type: "enum",
    enum: UserAccountStatus,
    default: UserAccountStatus.activate,
  })
  isActive: UserAccountStatus;

  @Column({ type: "varchar", length: 10, nullable: true })
  otpCode?: string;

  @Column({ type: "date", nullable: true })
  otpExpired?: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createAt: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updateAt: Date;
}

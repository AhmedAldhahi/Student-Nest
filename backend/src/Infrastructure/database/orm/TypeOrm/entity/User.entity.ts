import { Entity, Column, PrimaryColumn } from "typeorm";
import { UserRole } from "../../../../../Core/enum/UserRole.enum";
import { UserAccountStatus } from "../../../../../Core/enum/UserAccountStatus.enum";

@Entity("user")
export class User {
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  private createAt: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  private updateAt: Date;
  @Column({ type: "varchar", length: 100, nullable: true })
  Address?: string;

  @Column({ type: "varchar", length: 4 })
  DateOfBirth: string;

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
  @Column({ type: "varchar", length: 15 })
  PhoneNumber: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  Photo?: string;
  @Column({
    type: "enum",
    enum: UserAccountStatus,
    default: UserAccountStatus.activate,
  })
  isActive: UserAccountStatus;

  // --- THIS IS THE FIX ---
  // We changed the type from "string?" to "string | null"
  // This allows the class property to accept 'null'
  @Column({ type: "varchar", length: 10, nullable: true })
  otpCode: string | null;

  // --- THIS IS THE FIX ---
  // We changed the type from "Date?" to "Date | null"
  @Column({ type: "timestamp", nullable: true })
  otpExpired: Date | null;
}
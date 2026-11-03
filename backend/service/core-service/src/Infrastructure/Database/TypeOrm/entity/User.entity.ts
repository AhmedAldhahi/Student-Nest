// UserModel.ts
import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from "typeorm";
import { UserRole } from "../../../../Domain/Shared/Enum/UserRole.enum";
import { UserAccountStatus } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Enum/UserAccountStatus.enum";
import { LandlordModel } from "./Landlord.entity";
import { StudentModel } from "./Student.entity";
import { AdminModel } from "./Admin.entity";

@Entity("user")
export class UserModel {
  @PrimaryColumn()
  userId: string;

  @Column({ type: "varchar", length: 75 })
  Name: string;

  @Column({ type: "varchar", length: 150, unique: true })
  Email: string;

  @Column({ type: "varchar", length: 150 })
  Password: string;

  @Column({ type: "varchar", length: 15 })
  PhoneNumber: string;

  @Column({ type: "varchar", length: 4 })
  DateOfBirth: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  Address?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  Photo?: string;

  @Column({ type: "enum", enum: UserRole })
  Role: UserRole;

  @Column({
    type: "enum",
    enum: UserAccountStatus,
    default: UserAccountStatus.activate,
  })
  isActive: UserAccountStatus;

  @Column({ default: false })
  emailVerfied: boolean;

  @Column({ type: "varchar", length: 10, nullable: true })
  otpCode: string | null;

  @Column({ type: "timestamp", nullable: true })
  otpExpired: Date | null;

  @Column({ default: false })
  resetPasswordVerified: boolean;

  @Column({ type: "varchar", length: 10, nullable: true })
  OtpResetPasswordCode: string | null;

  @Column({ type: "timestamp", nullable: true })
  OtpExpiredResetPassword: Date | null;

  @CreateDateColumn({ name: "createAt" })
  createAt: Date;

  @UpdateDateColumn({ name: "updateAt" })
  updateAt: Date;

  // One-to-One relation with Landlord
  @OneToOne(() => LandlordModel, (landlord) => landlord.user)
  landlord: LandlordModel;

  @OneToOne(() => StudentModel, (student) => student.user)
  student: StudentModel;

  @OneToOne(() => AdminModel, (admin) => admin.user)
  admin: AdminModel;
}

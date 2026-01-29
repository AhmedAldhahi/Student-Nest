import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  PrimaryColumn,
  OneToMany,
} from "typeorm";
import { UserModel } from "./User.entity";
import { LeaseModel } from "./Lease.entity";

@Entity("students")
export class StudentModel {
  @Column({ type: "int" })
  GraduationYear: number;
  @Column({ type: "varchar", length: 100 })
  Major: string;
  @Column({ type: "varchar", length: 50, unique: true })
  StudentCardId: string;
  @Column({ type: "varchar", length: 20 })
  StudentGovId: string;
  @Column({ type: "varchar", length: 100 })
  UniversityName: string;

  @Column({ type: "varchar", length: 200 })
  verificationFiles: string;

  @Column({ type: "boolean", default: true, nullable: false })
  enableWhatsapp: boolean;

  @Column({ type: "boolean", nullable: true, default: false })
  roommateProfileStatus: boolean;

  @PrimaryColumn()
  userId: string; // same id as user

  @Column({ type: "varchar", nullable: true })
  walletAddress: string;

  @OneToOne(() => UserModel, { cascade: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: UserModel;

  @OneToMany(() => LeaseModel, (lease) => lease.student)
  leases: LeaseModel[];
}

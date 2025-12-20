import {
  Entity,
  Column,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { LandlordModel } from "./Landloard.entity";
import { StudentModel } from "./Student.entity";

@Entity("leases")
export class LeaseModel {
  @PrimaryGeneratedColumn()
  leaseId: number;

  @Column({ type: "varchar", nullable: false, length: 10 })
  leaseStartDate: string;

  @Column({ type: "varchar", nullable: false, length: 10 })
  leaseEndDate: string;

  @Column({ type: "text", nullable: true })
  houseRule: string;

  @Column({ type: "boolean", default: false })
  isLandlordSigned: boolean;

  @Column({ type: "boolean", default: false })
  isStudentSigned: boolean;

  @Column({ type: "varchar", nullable: false })
  monthlyRent: string;

  @Column({ type: "boolean", default: true })
  LeaseActivationStatus: boolean;

  @Column({ type: "varchar", nullable: false })
  leaseTerm: string;

  @Column({ type: "text", nullable: true })
  includeUtilities: string | null;

  @CreateDateColumn({ name: "createAt" })
  createAt: Date;

  @ManyToOne(() => StudentModel, (student) => student.leases, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "studentId" })
  student: StudentModel;

  @ManyToOne(() => LandlordModel, (landlord) => landlord.leases, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "landlordId" })
  landlord: LandlordModel;
}

/**
 * lease id *
 *
 * * apartment
 */

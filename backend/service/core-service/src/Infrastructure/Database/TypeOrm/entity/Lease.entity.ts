import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  PrimaryColumn,
  OneToMany,
} from "typeorm";
import { LandlordModel } from "./Landlord.entity";
import { StudentModel } from "./Student.entity";
import { ApartmentModel } from "./Apartment.entity";
import { PaymentScheduleModel } from "./PaymentSchedual.entity";

@Entity("leases")
export class LeaseModel {
  @PrimaryColumn()
  leaseId: string;

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

  @Column({ type: "boolean", default: false })
  LeaseActivationStatus: boolean;

  @Column({ type: "varchar", nullable: false })
  leaseTerm: string;

  @Column({ type: "text", nullable: true })
  includeUtilities: string | null;

  @CreateDateColumn({ name: "createAt" })
  createAt: Date;

  @ManyToOne(() => StudentModel, (student) => student.leases, {
    nullable: true,
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "studentId" })
  student: StudentModel;

  @Column({ nullable: true })
  studentId: string;

  @ManyToOne(() => LandlordModel, (landlord) => landlord.leases, {
    nullable: true,
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "landlordId" })
  landlord: LandlordModel;

  @Column({ nullable: true })
  landlordId: string;

  @ManyToOne(() => ApartmentModel, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "apartmentId" })
  apartment: ApartmentModel;

  @Column({ nullable: false })
  apartmentId: string;

  @OneToMany(() => PaymentScheduleModel, (payment) => payment.lease, {
    cascade: true, 
  })
  payments: PaymentScheduleModel[];
}

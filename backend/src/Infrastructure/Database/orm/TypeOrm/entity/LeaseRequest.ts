import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  PrimaryColumn,
} from "typeorm";
import { LandlordModel } from "./Landloard.entity";
import { StudentModel } from "./Student.entity";
import { LeaseRequestStatus } from "../../../../../Domain/Shared/Enum/LeaseRequestStatus.enum";
import { ApartmentModel } from "./Apartment.entity";

@Entity("leaseRequest")
export class LeaseRequestModel {
  @PrimaryColumn()
  leaseRequestId: string;

  @Column({ type: "text", nullable: false })
  requestMessage: string;

  @Column({ type: "varchar", nullable: false })
  startDate: string;

  @Column({ type: "varchar", nullable: false })
  rentTerm: string;

  @Column({ type: "enum", enum: LeaseRequestStatus })
  requestStatus: LeaseRequestStatus;

  @CreateDateColumn({ name: "createAt" })
  createAt: Date;

  @ManyToOne(() => StudentModel, {
    nullable: false,
    onDelete: "CASCADE",
  })

  @JoinColumn({ name: "studentId" })
  student: StudentModel;


  @Column({ nullable: false })
  studentId: string;

  @ManyToOne(() => LandlordModel, {
    nullable: false,
    onDelete: "CASCADE",
  })

  @JoinColumn({ name: "landlordId" })
  landlord: LandlordModel;

  @Column({ nullable: false })
  landlordId: string;

  @ManyToOne(() => ApartmentModel, {
    nullable: false,
    onDelete: "CASCADE",
  })
  
  @JoinColumn({ name: "apartmentId" })
  apartment: ApartmentModel;

  @Column({ nullable: false })
  apartmentId: string;
}

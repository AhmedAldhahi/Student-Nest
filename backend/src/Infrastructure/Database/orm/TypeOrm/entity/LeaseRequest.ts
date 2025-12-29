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
import { LeaseRequestStatus } from "../../../../../Domain/Enum/LeaseRequestStatus.enum";
import { ApartmentModel } from "./Apartment.entity";

@Entity("leaseRequest")
export class LeaseRequestModel {
  @PrimaryGeneratedColumn()
  leaseRequestId: number;

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

  @ManyToOne(() => LandlordModel, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "landlordId" })
  landlord: LandlordModel;

  @ManyToOne(() => ApartmentModel, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "apartmentId" })
  apartment: ApartmentModel;
}

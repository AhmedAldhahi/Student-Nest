import { Entity, Column, OneToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { UserModel } from "./User.entity";

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
  
  @PrimaryColumn()
  userId: string; // same id as user

  @Column({type: "varchar", nullable: true})
  walletAddress: string;

  @OneToOne(() => UserModel, { cascade: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: UserModel;
}

//TODO: add wallet address


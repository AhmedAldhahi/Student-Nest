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
  @PrimaryColumn()
  userId: string; // same id as user

  @OneToOne(() => UserModel, { cascade: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: UserModel;
}

import { Entity, Column, OneToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { User } from "./User.entity";

@Entity("students")
export class Student {
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

  @OneToOne(() => User, { cascade: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: User;
}

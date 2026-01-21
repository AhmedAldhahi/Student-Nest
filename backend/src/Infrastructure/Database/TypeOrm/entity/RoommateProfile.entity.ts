import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { UserLanguage } from "../../../../Domain/BoundedContexts/RommateProfile/Enum/UserLanguage.enum";
import { NoiseTolerance } from "../../../../Domain/BoundedContexts/RommateProfile/Enum/Noise tolerance.enum";
import { SleepSchedule } from "../../../../Domain/BoundedContexts/RommateProfile/Enum/SleepSchedule.enum";
import { LifeCycleHabitModel } from "./LifeCycleHabits.entity";
import { StudentAggregateRoot } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Aggregates/StudentAggregateRoot.entity";
import { StudentModel } from "./Student.entity";

@Entity("RoommateProfile")
export class RoommateProfileModel {
  @PrimaryColumn()
  RoommateProfileId: string;

  @Column({ type: "text", nullable: true })
  bio: string;

  @Column({ type: "enum", enum: UserLanguage, nullable: false })
  language: UserLanguage;

  @Column({ type: "enum", enum: NoiseTolerance, nullable: false })
  noiseTolerance: NoiseTolerance;

  @Column({ type: "enum", enum: SleepSchedule, nullable: false })
  sleepSchedule: SleepSchedule;

  @Column({ type: "varchar", nullable: false })
  minAge: string;

  @Column({ type: "varchar", nullable: false })
  maxAge: string;

  @CreateDateColumn({ name: "createAt" })
  createAt: Date;

  @Column({ nullable: false })
  studentId: string;

  @OneToOne(() => StudentModel)
  @JoinColumn({ name: "studentId" })
  student: StudentAggregateRoot;

  // 1-to-1 Relationship Definition
  @OneToOne(() => LifeCycleHabitModel, (habit) => habit.profile, {
    cascade: true,
    eager: true,
    onDelete: "CASCADE", // If Profile is deleted, delete Habit
  })
  @JoinColumn()
  lifeCycleHabit: LifeCycleHabitModel;
}

import { LifeCycleHabitEntity } from "../Entities/LifeCycleHabbitEntity.entity";

export interface IReadLifeCycleHabit {
  FindRoommateProfileForStudent(
    userId: string,
    roommateId: string,
  ): Promise<LifeCycleHabitEntity | null>;
}

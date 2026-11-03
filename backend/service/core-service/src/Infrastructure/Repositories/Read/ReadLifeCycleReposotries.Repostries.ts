import { LifeCycleHabitEntity } from "../../../Domain/BoundedContexts/RommateProfile/Entities/LifeCycleHabbitEntity.entity";
import { IReadLifeCycleHabit } from "../../../Domain/BoundedContexts/RommateProfile/Repositories/ReadLifeCycleHabbit.reposotires";
import { AppDataSource } from "../../Database/TypeOrm/data-source";
import { LifeCycleHabitModel } from "../../Database/TypeOrm/entity/LifeCycleHabits.entity";
import { LifeCycleHabitMapper } from "../mapper/lifeCycleHabit.mapper";

export class ReadLifeCycleRepositories implements IReadLifeCycleHabit {
  public async FindRoommateProfileForStudent(
    userId: string,
  ): Promise<LifeCycleHabitEntity | null> {
    try {
      const lifeCycleHabitModel = await AppDataSource.getInstance()
        .getRepository(LifeCycleHabitModel)
        .findOne({
          where: {
            profile: {
              RoommateProfileId: userId,
            },
          },
          relations: {
            profile: true,
          },
        });

      if (!lifeCycleHabitModel) return null;

      return LifeCycleHabitMapper.toEntity(lifeCycleHabitModel);
    } catch (error: any) {
      console.error("fail to get life cycle habit", error);
      throw error;
    }
  }
}

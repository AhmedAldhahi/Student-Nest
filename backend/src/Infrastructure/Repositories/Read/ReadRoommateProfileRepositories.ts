import { RoommateProfileAggregate } from "../../../Domain/BoundedContexts/RommateProfile/Aggregates/RommateProfile.aggregateRoot";
import { IReadRoommateProfileRepo } from "../../../Domain/BoundedContexts/RommateProfile/Repositories/ReadRommateProfile.reposotries";
import { AppDataSource } from "../../Database/TypeOrm/data-source";
import { RoommateProfileModel } from "../../Database/TypeOrm/entity/RoommateProfile.entity";
import { RoommateProfileMapper } from "../mapper/roommateProfile.mapper";

export class ReadRoommateProfileRepositories implements IReadRoommateProfileRepo {
  public async FindStudentRoommateProfile(
    userId: string,
  ): Promise<RoommateProfileAggregate | null> {
    try {
      const roommateProfileModel = await AppDataSource.getInstance()
        .getRepository(RoommateProfileModel)
        .findOne({
          where: { studentId: userId },
          relations: { student: true },
        });

      if (!roommateProfileModel) return null;
      return RoommateProfileMapper.toEntity(roommateProfileModel);
    } catch (error: any) {
      console.error("fail to create roommate profile", error);
      throw error;
    }
  }
}

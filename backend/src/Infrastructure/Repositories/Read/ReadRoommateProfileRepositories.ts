import { RoommateProfileAggregate } from "../../../Domain/BoundedContexts/RommateProfile/Aggregates/RommateProfile.aggregateRoot";
import { IReadRoommateProfileRepo } from "../../../Domain/BoundedContexts/RommateProfile/Repositories/ReadRommateProfile.reposotries";
import { FindStudentRoommateProfileDTO } from "../../../Domain/BoundedContexts/RommateProfile/Representations/FindStudentRoommateDTO";
import { StudentRoommateProfileDTO } from "../../../Domain/BoundedContexts/RommateProfile/Representations/StudntRoommateProfileDTO";
import { AppDataSource } from "../../Database/TypeOrm/data-source";
import { RoommateProfileModel } from "../../Database/TypeOrm/entity/RoommateProfile.entity";
import { RoommateProfileMapper } from "../mapper/roommateProfile.mapper";

export class ReadRoommateProfileRepositories implements IReadRoommateProfileRepo {
  public async FindStudentsRoommateProfile(
    userId: string,
  ): Promise<StudentRoommateProfileDTO | null> {
    try {
      const roommateProfileModel = await AppDataSource.getInstance()
        .getRepository(RoommateProfileModel)
        .findOne({
          where: { studentId: userId },
          relations: {
            lifeCycleHabit: true,
            student: {
              user: true,
            },
          },
        });

      if (!roommateProfileModel) return null;

      return RoommateProfileMapper.toResponse(roommateProfileModel);
    } catch (error: any) {
      console.error("Fail to get student roommate profile !!", error);
      throw error;
    }
  }

  public async FindStudentsRoommateProfiles(
    userId: string,
  ): Promise<FindStudentRoommateProfileDTO[]> {
    try {
      const repo =
        AppDataSource.getInstance().getRepository(RoommateProfileModel);

      const myProfile = await repo.findOne({
        where: { studentId: userId },
        relations: { lifeCycleHabit: true },
      });

      if (!myProfile) return [];

      const query = repo
        .createQueryBuilder("profile")
        .innerJoinAndSelect("profile.student", "student")

        .innerJoinAndSelect("student.user", "user")

        .leftJoinAndSelect("profile.lifeCycleHabit", "habit")

        .where("profile.studentId != :myId", { myId: userId });

      const matches = await query.getMany();

      return matches.map((match) => {
        const userEntity = match.student.user;

        return {
          userId: userEntity.userId,
          Name: userEntity.Name,
          photo: userEntity.Photo || "",
          phoneNumber: userEntity.PhoneNumber,
        };
      });
    } catch (error: any) {
      console.error("fail to find matching profiles !!", error);
      throw error;
    }
  }

  public async FindStudentRoommateProfileById(
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

import { EntityManager } from "typeorm";
import { RoommateProfileAggregate } from "../../../Domain/BoundedContexts/RommateProfile/Aggregates/RommateProfile.aggregateRoot";
import { IWriteRoommateProfile } from "../../../Domain/BoundedContexts/RommateProfile/Repositories/WriteRommateProfile.reposotries";
import { RoommateProfileMapper } from "../mapper/roommateProfile.mapper";

export class WriteRoommateProfileRepositories implements IWriteRoommateProfile {
  constructor(private readonly manager: EntityManager) {}

  public async AddRoommateProfileForStudent(
    profile: RoommateProfileAggregate,
  ): Promise<void> {
    try {
      const model = RoommateProfileMapper.toModel(profile);
      await this.manager.save(model);
    } catch (error: any) {
      console.error("fail to create roommate profile !!", error);
      throw error;
    }
  }

  public async UpdateRoommateProfileForStudent(
    profile: RoommateProfileAggregate,
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

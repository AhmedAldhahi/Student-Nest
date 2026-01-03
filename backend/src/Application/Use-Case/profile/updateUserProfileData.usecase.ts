import { IReadUserRepositories } from "../../../Domain/Modules/Identity/Repositories/ReadUserRepositories.repositories";
import { userUpdateProfileRequest } from "../../DTO/shared/profile/adminRequest.updateProfile.profile.dto";
import { ProfileContext } from "../../Strategy/profiles/profilecontext";

export class updateUserProfileDataUseCase {
  constructor(
    private readonly readUserRepo: IReadUserRepositories,
    private context: ProfileContext
  ) {}

  public async execute(userId: string, dto: userUpdateProfileRequest) {
    try {
      const user = await this.readUserRepo.findById(userId);
      if (!user) throw new Error("no user found !!");

      return await this.context.executeUpdateStrategy(
        user.getRole(),
        user.getUserId(),
        dto
      );
    } catch (error: any) {
      throw error;
    }
  }
}

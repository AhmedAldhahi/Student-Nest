import { IReadUserRepositories } from "../../../Domain/Repositories/Read/ReadUserRepositories.repositories";
import { userUpdateProfileRequest } from "../../Dtos/profile/adminRequest.updateProfile.profile.dtos";
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

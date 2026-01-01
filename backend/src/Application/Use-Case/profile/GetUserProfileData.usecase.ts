import { IReadUserRepositories } from "../../../Domain/Modules/Identity/Repositories/ReadUserRepositories.repositories";
import { ProfileContext } from "../../Strategy/profiles/profilecontext";

export class UserProfileDataUseCase {
  constructor(
    private context: ProfileContext,
    private readonly readUserRepo: IReadUserRepositories
  ) {}

  public async execute(userId: string) {
    const user = await this.readUserRepo.findById(userId);

    if (!user) throw new Error("no user found !!");

    return await this.context.executeStrategy(user.getRole(), userId);
  }
}

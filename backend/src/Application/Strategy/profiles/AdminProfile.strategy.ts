import { UpdateAdminCommand } from "../../Command/Commands/UpdateAdminCommand";
import { UpdateAdminCommandHandler } from "../../Command/Handlers/UpdateAdminCommandHandler";
import { UpdateLandlordCommandHandler } from "../../Command/Handlers/UpdateLandlordCommandHandler";
import { userUpdateProfileRequest } from "../../DTO/profile/adminRequest.updateProfile.profile.dtos";
import { ICashMemoryService } from "../../Interfaces/ICash.interface";
import { GetUserProfileQueriesHandlers } from "../../Queries/Handlers/GetUserProfileQueriesHandlerts";
import { GetUserProfileQueries } from "../../Queries/Queries/GetUserProfileQueries";
import { IProfileStrategy } from "./IprofileStrategy.strategy";

export class AdminProfileStrategy implements IProfileStrategy {
  constructor(
    private readonly QueryHandler: GetUserProfileQueriesHandlers,
    private readonly commandHandler: UpdateAdminCommandHandler,
    private readonly cashService: ICashMemoryService
  ) {}
  public async UserProfile(userId: string) {
    const cashKey = `profile : ${userId}`;

    const cashData = await this.cashService.get<any>(cashKey);

    if (cashData) {
      return cashData;
    }

    const Queries = new GetUserProfileQueries(userId);
    const user = await this.QueryHandler.handle(Queries);

    if (!user) throw new Error("no user");

    await this.cashService.set(cashKey, user, 36000);

    return user;
  }

  public async UpdateUserProfile(
    userId: string,
    dto: userUpdateProfileRequest
  ): Promise<any> {
    try {
      const command = new UpdateAdminCommand(userId, dto);

      await this.commandHandler.handle(command);

      const cashKey = `profile : ${userId}`;
      await this.cashService.delete(cashKey);

      return {
        message: "Admin profile update succfully ",
      }; 

    } catch (error: any) {
      console.error("Error updating profile:", error.message);
      throw error; // Optionally re-throw the error if you need it to propagate
    }
  }
}

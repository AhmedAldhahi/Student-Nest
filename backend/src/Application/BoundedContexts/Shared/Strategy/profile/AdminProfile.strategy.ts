import { ICashMemoryService } from "../../../../Interfaces/ICash.interface";
import { UpdateAdminCommand } from "../../../IdentityAndAccess/Command/UpdateAdminCommand";
import { UpdateAdminCommandHandler } from "../../../IdentityAndAccess/CommandHandler/UpdateAdminCommandHandler";
import { BaseUpdateProfileRequest } from "../../../IdentityAndAccess/Dto/Request/BaseUpdateProfileRequest";
import { GetUserProfileResponse } from "../../../IdentityAndAccess/Dto/Response/GetUserProfileResponse";
import { UpdateProfileResponse } from "../../../IdentityAndAccess/Dto/Response/UpdateProfileResponse";
import { GetUserProfileQueries } from "../../../IdentityAndAccess/Queries/GetUserProfileQueries";
import { GetUserProfileQueriesHandlers } from "../../../IdentityAndAccess/QueriesHandler/GetUserProfileQueriesHandlerts";
import { IProfileStrategy } from "./IProfileStrategy.strategy";

export class AdminProfileStrategy implements IProfileStrategy {
  constructor(
    private readonly QueryHandler: GetUserProfileQueriesHandlers,
    private readonly commandHandler: UpdateAdminCommandHandler,
    private readonly cashService: ICashMemoryService
  ) {}
  public async UserProfile(userId: string) : Promise<GetUserProfileResponse>{
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
    dto: BaseUpdateProfileRequest
  ): Promise<UpdateProfileResponse> {
    try {
      const command = new UpdateAdminCommand(userId, dto);

      await this.commandHandler.handle(command);

      const cashKey = `profile : ${userId}`;
      await this.cashService.delete(cashKey);

      return {
        message: "Admin profile update successfully ",
      };
    } catch (error: any) {
      console.error("Error updating profile:", error.message);
      throw error; // Optionally re-throw the error if you need it to propagate
    }
  }
}

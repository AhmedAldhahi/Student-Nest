import { CacheKeys } from "../../../../../Shared/constants/CacheKeys.constant";
import { ICashMemoryService } from "../../../../Interfaces/ICash.interface";
import { UpdateLandlordCommand } from "../../../IdentityAndAccess/Command/UpdateLandlordCommand";
import { UpdateLandlordCommandHandler } from "../../../IdentityAndAccess/CommandHandler/UpdateLandlordCommandHandler";
import { UpdateLandlordProfileRequest } from "../../../IdentityAndAccess/Dto/Request/UpdateLandlordProfileRequest";
import { GetLandlordProfileResponse } from "../../../IdentityAndAccess/Dto/Response/GetLandlordProfileResponse";
import { UpdateProfileResponse } from "../../../IdentityAndAccess/Dto/Response/UpdateProfileResponse";
import { GetUserProfileQueries } from "../../../IdentityAndAccess/Queries/GetUserProfileQueries";
import { GetLandlordProfileQueriesHandlers } from "../../../IdentityAndAccess/QueriesHandler/GetLandlordProfileQueriesHandler";
import { IProfileStrategy } from "./IProfileStrategy.strategy";

export class LandlordProfileStrategy implements IProfileStrategy {
  constructor(
    private readonly QueryHandler: GetLandlordProfileQueriesHandlers,
    private readonly commandHandler: UpdateLandlordCommandHandler,
    private readonly cashService: ICashMemoryService,
  ) {}

  public async UserProfile(
    userId: string,
  ): Promise<GetLandlordProfileResponse> {
    const cashKey = CacheKeys.Profile(userId);

    const cashData = await this.cashService.get<any>(cashKey);

    if (cashData) {
      return cashData;
    }

    const Queries = new GetUserProfileQueries(userId);
    const landlord = await this.QueryHandler.handle(Queries);

    if (!landlord) throw new Error("no user found !!");

    await this.cashService.set(cashKey, landlord, 36000);

    return landlord;
  }

  public async UpdateUserProfile(
    userId: string,
    dto: UpdateLandlordProfileRequest,
  ): Promise<UpdateProfileResponse> {
    try {
      const command = new UpdateLandlordCommand(userId, dto);
      await this.commandHandler.handle(command);

      const cashKey = CacheKeys.Profile(userId);
      await this.cashService.delete(cashKey);
      return {
        message: "landlord profile update successfully ",
      };
    } catch (error: any) {
      console.error("error while updating landlord profile !!", error);
      throw error;
    }
  }
}

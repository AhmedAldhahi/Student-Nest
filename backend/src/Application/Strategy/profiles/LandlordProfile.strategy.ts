import { UpdateLandlordCommand } from "../../Command/Commands/UpdateLandlordCommand";
import { UpdateLandlordCommandHandler } from "../../Command/Handlers/UpdateLandlordCommandHandler";
import { LandlordUpdateProfileRequest } from "../../DTO/profile/LandlordRequest.updateProfile.profile.dto";
import { ICashMemoryService } from "../../Interfaces/ICash.interface";
import { GetLandlordProfileQueriesHandlers } from "../../Queries/Handlers/GetLandlordProfileQueriesHandler";
import { GetUserProfileQueries } from "../../Queries/Queries/GetUserProfileQueries";
import { IProfileStrategy } from "./IprofileStrategy.strategy";

export class LandlordProfileStrategy implements IProfileStrategy {
  constructor(
    private readonly QueryHandler: GetLandlordProfileQueriesHandlers,
    private readonly commandHandler: UpdateLandlordCommandHandler,
    private readonly cashService: ICashMemoryService
  ) {}

  public async UserProfile(userId: string) {
    const cashKey = `profile : ${userId}`;

    const cashData = await this.cashService.get<any>(cashKey);

    if (cashData) {
      return cashData;
    }

    const Queries = new GetUserProfileQueries(userId);
    const landloard = await this.QueryHandler.handle(Queries);

    if (!landloard) throw new Error("no user found !!");

    await this.cashService.set(cashKey, landloard, 36000);

    return landloard;
  }

  public async UpdateUserProfile(
    userId: string,
    dto: LandlordUpdateProfileRequest
  ): Promise<any> {
    try {
      const command = new UpdateLandlordCommand(userId, dto);
      await this.commandHandler.handle(command);

      const cashKey = `profile : ${userId}`;
      await this.cashService.delete(cashKey); 
      return {
        message: "landlord profile update succfully "
      }
    } catch (error: any) {
      console.error("error while updating landlord profile !!", error);
      throw error;
    }
  }
}

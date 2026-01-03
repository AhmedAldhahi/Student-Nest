import { ICashMemoryService } from "../../Interfaces/ICash.interface";
import { GetUserProfileQueries } from "../../Queries/Queries/User/GetUserProfileQueries";
import {UpdateLandlordCommandHandler} from "../../Command/Handlers/Housing/Landlord/UpdateLandlordCommandHandler"
import {GetLandlordProfileQueriesHandlers} from "../../Queries/Handlers/Housing/Landlord/GetLandlordProfileQueriesHandler"

import { IProfileStrategy } from "./IprofileStrategy.strategy";
import { UpdateLandlordCommand } from "../../Command/Commands/Landlord/UpdateLandlordCommand";
import { LandlordUpdateProfileRequest } from "../../DTO/shared/profile/LandlordRequest.updateProfile.profile.dto";

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
    const landlord = await this.QueryHandler.handle(Queries);

    if (!landlord) throw new Error("no user found !!");

    await this.cashService.set(cashKey, landlord, 36000);

    return landlord;
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

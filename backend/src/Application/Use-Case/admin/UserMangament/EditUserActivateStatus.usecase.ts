import { UpdateUserActivateStatus } from "../../../Command/Commands/User/updateUserActivateStatus.command";
import { UpdateUserActivateStatusCommandHandler } from "../../../Command/Handlers/Adminstration/UpdateUserActivateStatus.CommandHandler";
import { EditUserActivateStatsRequest } from "../../../DTO/admin/EditAccountStatus.dto";

export class EditUserActivateStatsUseCase {
  constructor(
    private readonly commandHandler: UpdateUserActivateStatusCommandHandler
  ) {}

  public async execute(dto: EditUserActivateStatsRequest, id: string) {
    try {
      const command = new UpdateUserActivateStatus(dto.data, id);
      await this.commandHandler.handle(command);
      return {
        message: "user account status updated !!",
      };
    } catch (error: any) {
      console.error("fail to update status !!");
      throw error;
    }
  }
}

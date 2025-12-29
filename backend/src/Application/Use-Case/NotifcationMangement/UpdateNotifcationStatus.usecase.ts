import { UpdateNotificationStatusCommand } from "../../Command/Commands/UpdateNotifcationStatusCommand";
import { UpdateNotificationStatusCommandHandler } from "../../Command/Handlers/updateNotifcationStatusCommandHandler";
import { EditNotificationStatusRequest } from "../../DTO/admin/EditNotificationStatus.Request.dto";


export class UpdateNotificationStatusUseCase {
  constructor(
    private readonly commandHandler: UpdateNotificationStatusCommandHandler
  ) {}

  public async execute(dto: EditNotificationStatusRequest) {
    try {
      const command = new UpdateNotificationStatusCommand(dto.isRead, dto.id);
      await this.commandHandler.handle(command);
      
      return {
        message: "notification status update successfully",
      };
    } catch (error: any) {
      console.error("fail to update status !!");
      throw error;
    }
  }
}

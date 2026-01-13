import { updateLeaseRequestCommand } from "../../../Command/Commands/Landlord/UpdateLeaseRequestCommand";
import { updateLeaseRequestCommandHandler } from "../../../Command/Handlers/Leases/LeaseRequest/updateLeaseRequestCommandHandler";
import { UpdateLeaseRequestStatusRequest } from "../../../DTO/landlord/updateLeastRequestStatus.dto";

export class UpdateLeaseRequestUseCase {
  constructor(
    private readonly commandHandler: updateLeaseRequestCommandHandler
  ) {}

  public async execute(
    userId: string,
    id: string,
    dto: UpdateLeaseRequestStatusRequest
  ) {
    try {
      const command = new updateLeaseRequestCommand(dto.status, userId, id);
      await this.commandHandler.handle(command);
      return {
        message: "lease request status changed successfully "
      }
    } catch (error: any) {
      console.error("fail to update leases Request");
      throw error;
    }
  }
}

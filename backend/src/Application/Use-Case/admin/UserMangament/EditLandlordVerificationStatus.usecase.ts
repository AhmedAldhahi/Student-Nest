import { EditLandlordVerificationStatus } from "../../../Command/Commands/Landlord/UpdateVerficationLandlordStatusCommand";
import { updateVerificationStatusCommandHandler } from "../../../Command/Handlers/Adminstration/updateLandlordVerficationStatusCommandHandler"
import { EditLandlordVerificationStatusRequest } from "../../../DTO/admin/EditLandlordVerificationStatusRequest.dto";
import { ICashMemoryService } from "../../../Interfaces/ICash.interface";

export class EditLandlordVerificationStatusUseCase {
  constructor(
    private commandHandler: updateVerificationStatusCommandHandler,
    private cashService: ICashMemoryService
  ) {}

  public async execute(
    userId: string,
    dto: EditLandlordVerificationStatusRequest
  ) {
    try {
      const cashKey = `profile : ${userId}`;
      await this.cashService.delete(cashKey);

      const command = new EditLandlordVerificationStatus(userId, dto.Verified);
      await this.commandHandler.handle(command);

      return {
        message: "landlord status updated scussfuly ",
      };
    } catch (error: any) {
      console.error("error while updating landlord status");
      throw error;
    }
  }
}

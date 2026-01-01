import { EditApartmentVerificationStatus } from "../../../Command/Commands/Apartment/udateApartmentVerfiedSTatus.command";
import { EditApartmentVerificationStatusRequest } from "../../../DTO/admin/EditApartmentVerficationStatusDTO.dto";
import { EditApartmentStatusVerifiedCommandHandler } from "../../../Command/Handlers/Housing/Apartment/EditApartmetVerficationStatusCommandHandler";
export class EditApartmentStatusVerifiedUseCase {
  constructor(
    private readonly commandHandler: EditApartmentStatusVerifiedCommandHandler
  ) {}

  public async execute(dto: EditApartmentVerificationStatusRequest) {
    try {
      const command = new EditApartmentVerificationStatus(
        dto.apartmentId,
        dto.Verified
      );
      await this.commandHandler.handle(command);

      return {
        message: "apartment status update successfully ",
      };
    } catch (error: any) {
      console.error("fail to update apartment status !!");
      throw error;
    }
  }
}

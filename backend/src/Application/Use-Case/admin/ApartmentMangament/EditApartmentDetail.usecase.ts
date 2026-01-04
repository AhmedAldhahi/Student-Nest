import { EditApartmentDetailByIdCommand } from "../../../Command/Commands/Apartment/EditApartmentCommand";
import { EditApartmentDetailForLandlordCommandHandler } from "../../../Command/Handlers/Housing/Apartment/EditApartmentDetailForLandlordCommandHandler";
import { EditApartmentDataRequest } from "../../../DTO/admin/EditApartmentData.dto";

export class EditApartmentDetailUseCase {
  constructor(
    private readonly commandHandler: EditApartmentDetailForLandlordCommandHandler
  ) {}

  public async execute(dto: EditApartmentDataRequest, id: string,userId:string) {
    try {
      const command = new EditApartmentDetailByIdCommand(dto,id,userId);
      await this.commandHandler.handle(command);
      return {
        message: "apartment updated ",
      };
    } catch (error: any) {
      console.error("fail to update apartment data !!");
      throw error;
    }
  }
}

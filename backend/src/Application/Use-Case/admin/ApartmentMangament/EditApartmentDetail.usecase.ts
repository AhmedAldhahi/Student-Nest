import { EditApartmentDetailByIdCommand } from "../../../Command/Commands/Apartment/EditApartmentCommand";
import { EditApartmentDetailByIdCommandHandler } from "../../../Command/Handlers/Housing/Apartment/EditApartmentDetailByIdCommandHandler";
import { EditApartmentDataRequest } from "../../../DTO/admin/EditApartmentData.dto";

export class EditApartmentDetailUseCase {
  constructor(
    private readonly commandHandler: EditApartmentDetailByIdCommandHandler
  ) {}

  public async execute(dto: EditApartmentDataRequest, id: string) {
    try {
      const command = new EditApartmentDetailByIdCommand(dto, id);
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

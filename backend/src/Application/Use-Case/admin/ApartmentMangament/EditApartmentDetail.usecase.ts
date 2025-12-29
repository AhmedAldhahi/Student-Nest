import { EditApartmentDetailByIdCommand } from "../../../Command/Commands/EditApartmentCommand";
import { EditApartmentDetailByIdCommandHandler } from "../../../Command/Handlers/EditApartmentDetailByIdCommandHandler";
import { EditApartmentDataRequest } from "../../../DTO/admin/EditApartmentData.dto";

export class EditApartmentDetailUseCase {
  constructor(
    private readonly commandHandler: EditApartmentDetailByIdCommandHandler
  ) {}

  public async execute(dto: EditApartmentDataRequest, id: number) {
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

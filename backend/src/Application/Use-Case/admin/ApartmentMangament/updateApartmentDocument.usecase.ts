import { UpdateApartmentDocumentFileCommand } from "../../../Command/Commands/Admin/updateApartmentDocumentFileCommand";
import { UpdateApartmentDocumentFileCommandHandler } from "../../../Command/Handlers/Housing/Apartment/updateApartmentDocumentCommandHandler";
import { EditApartmentDocumentDataRequest } from "../../../DTO/admin/EditApaartmentDocumentDToRequest.dto";

export class UpdateApartmentDocumentUseCase {
  constructor(
    private readonly commandHandler: UpdateApartmentDocumentFileCommandHandler
  ) {}

  public async execute(
    dto: EditApartmentDocumentDataRequest,
    id: string
  ): Promise<{ message: string }> {
    try {
      const command = new UpdateApartmentDocumentFileCommand(dto, id);
      await this.commandHandler.handle(command);
      return {
        message: "apartment document update scussfuly",
      };
    } catch (error: any) {
      console.error("fail to update apartment document!!");
      throw error;
    }
  }
}

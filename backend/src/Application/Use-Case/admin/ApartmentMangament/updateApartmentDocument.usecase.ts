import { UpdateApartmentDocumentFileCommand } from "../../../Command/Commands/updateApartmentDocumentFileCommand";
import { UpdateApartmentDocumentFileCommandHandler } from "../../../Command/Handlers/updateApartmentDocumentCommandHandler";
import { EditApartmentDocumentDataRequest } from "../../../DTO/admin/EditApaartmentDocumentDToRequest.dtos";

export class UpdateApartmentDocumentUseCase {
  constructor(
    private readonly commandHandler: UpdateApartmentDocumentFileCommandHandler
  ) {}

  public async execute(
    dto: EditApartmentDocumentDataRequest,
    id: number
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

import { UpdateApartmentDocumentFileCommand } from "../../../Command/Commands/Admin/updateApartmentDocumentFileCommand";
import { UpdateApartmentDocumentFileCommandHandler } from "../../../Command/Handlers/Housing/Apartment/updateApartmentDocumentCommandHandler";
import { EditApartmentDocumentDataRequest } from "../../../DTO/admin/EditApaartmentDocumentDToRequest.dto";

export class UpdateApartmentDocumentUseCase {
  constructor(
    private readonly commandHandler: UpdateApartmentDocumentFileCommandHandler
  ) {}

  public async execute(
    dto: EditApartmentDocumentDataRequest,
    apartmentId: string,
    documentId: string,
    userId: string
  ): Promise<{ message: string }> {
    const command = new UpdateApartmentDocumentFileCommand(
      dto,
      apartmentId,
      documentId,
      userId
    );

    await this.commandHandler.handle(command);

    return { message: "Apartment document updated successfully" };
  }
}

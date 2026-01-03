import { UpdateApartmentDocumentFileCommand } from "../../../Command/Commands/Admin/updateApartmentDocumentFileCommand";
import { UpdateApartmentDocumentFileCommandHandler } from "../../../Command/Handlers/Housing/Apartment/updateApartmentDocumentCommandHandler";
import { EditApartmentDocumentDataRequest } from "../../../DTO/admin/EditApaartmentDocumentDToRequest.dto";
// Fixed Typo: 'EditApaartment' -> 'EditApartment'

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
    try {
      const command = new UpdateApartmentDocumentFileCommand(
        dto,
        apartmentId,
        documentId,
        userId
      );

      // Pass to Handler
      await this.commandHandler.handle(command);

      return { message: "Apartment document updated successfully" };
    } catch (error: any) {
      console.error("fail to update apartment documents !!");
      throw error;
    }
  }
}

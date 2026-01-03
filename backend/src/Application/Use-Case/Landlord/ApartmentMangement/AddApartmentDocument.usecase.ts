import { AddApartmentDocumentCommand } from "../../../Command/Commands/Apartment/AddApartmentDocumentCommand";
import { AddApartmentDocumentCommandHandler } from "../../../Command/Handlers/Housing/Apartment/AddApartmentDocumentCommandHandler";
import { AddApartmentDocumentRequest } from "../../../DTO/landlord/addApartmentDocumentRequest.dto";

export class AddApartmentDocumentUseCase {
  constructor(
    private readonly addApartmentDocumentCH: AddApartmentDocumentCommandHandler
  ) {}

  public async execute(userId: string, dto: AddApartmentDocumentRequest) {
    try {
      const command = new AddApartmentDocumentCommand(
        dto.apartmentDocumentUrl,
        dto.apartmentId,
        userId
      );

      await this.addApartmentDocumentCH.handle(command);
      return {
        message: "the apartment document add scussfuly",
      };
    } catch (error: any) {
      console.error("fail to add apartment documents !!", error);
      throw error;
    }
  }
}

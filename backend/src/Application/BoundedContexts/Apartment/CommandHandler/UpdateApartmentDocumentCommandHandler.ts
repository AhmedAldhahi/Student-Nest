import { IReadApartmentDocumentRepo } from "../../../../Domain/BoundedContexts/Housing/Repositories/ReadApartmentDocument.repositories";
import { IReadApartmentRepo } from "../../../../Domain/BoundedContexts/Housing/Repositories/ReadApartmentRepo.repositoreis";
import { IReadLandlordRepositories } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadLandlordRepositories.repositoreies";
import { IReadUserRepositories } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadUserRepositories.repositories";
import { IUnitOfWork } from "../../../../Domain/Shared/Repositories/UnitOfWorkRepositories.repositories";
import { IFileStorageService } from "../../../Interfaces/IFileStorage.interface";
import { ICommandHandlers } from "../../Shared/abstraction/ICommandHandler";
import { UpdateApartmentDocumentFileCommand } from "../Command/UpdateApartmentDocumentCommand";
import { UpdateApartmentDocumentResponse } from "../Dto/Respone/UpdateApartmentDocumentResponse";

export class UpdateApartmentDocumentFileCommandHandler
  implements ICommandHandlers<UpdateApartmentDocumentFileCommand>
{
  constructor(
    private readonly fileService: IFileStorageService,
    private readonly uow: IUnitOfWork,
    private readonly readApartmentRepo: IReadApartmentRepo,
    private readonly readLandlordRepo: IReadLandlordRepositories,
    private readonly readUserRepo: IReadUserRepositories,
    private readonly readApartmentDocumentRepo: IReadApartmentDocumentRepo
  ) {}

  public async handle(
    command: UpdateApartmentDocumentFileCommand
  ): Promise<UpdateApartmentDocumentResponse> {
    try {
      // 1. Validate User
      const user = await this.readUserRepo.findById(command.userId);
      if (!user) throw new Error("User not found.");
      user.ensureAccountIsActive();

      // 2. Validate Landlord
      const landlord = await this.readLandlordRepo.findLandlordById(
        command.userId
      );
      if (!landlord) throw new Error("Landlord profile not found.");

      // 3. Validate Apartment
      const apartment =
        await this.readApartmentRepo.findApartmentByIdForLandlord(
          command.apartmentId,
          command.userId
        );

      if (!apartment)
        throw new Error(
          "Apartment not found or does not belong to this landlord."
        );

      if (apartment.getIsVerified() === true) {
        throw new Error(
          "Unable to update documents: Apartment is already verified."
        );
      }

      // 4. Retrieve Document (Single Entity based on Apartment ID)
      const apartmentDocument =
        await this.readApartmentDocumentRepo.findApartmentDocumentByIdForLandlord(
          command.apartmentId,
          command.userId
        );

      // Guard: Check if the document exists
      if (!apartmentDocument) {
        throw new Error("No existing documents found for this apartment.");
      }

      // --- CHANGE START ---
      // We do NOT use .find() because it is already a single object.

      const targetDocument = apartmentDocument;
      // --- CHANGE END ---

      if (command.documentUrl) {
        const newFileUrl = await this.fileService.update(
          command.documentUrl, // The new file object
          targetDocument.getDocumentUrl() // The old string URL
        );
        targetDocument.UpdateDocumentUrl(newFileUrl);
      }

      if (command.apartmentType) {
        targetDocument.UpdateApartmentType(command.apartmentType);
      }

      // 7. Save Changes
      await this.uow.startTransaction();
      try {
        await this.uow.writeApartmentDocumentRepo.updateApartmentDocument(
          targetDocument
        );
        await this.uow.commitTransaction();
        return { message: "Apartment document updated successfully" };
      } catch (dbError) {
        await this.uow.rollbackTransaction();
        throw dbError;
      }
    } catch (error: any) {
      console.error("COMMAND HANDLER ERROR:", error);
      throw error;
    } finally {
      await this.uow.releaseTransaction();
    }
  }
}

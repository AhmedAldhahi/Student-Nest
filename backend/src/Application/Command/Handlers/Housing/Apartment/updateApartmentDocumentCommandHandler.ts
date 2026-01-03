import { ICommandHandlers } from "../../../ICommandHandlers";
import { UpdateApartmentDocumentFileCommand } from "../../../Commands/Admin/updateApartmentDocumentFileCommand";
import { IReadApartmentRepo } from "../../../../../Domain/Modules/Housing/Repositories/Read/ReadApartmentRepo.repositoreis";
import { IReadLandlordRepositories } from "../../../../../Domain/Modules/Housing/Repositories/Read/ReadLandlordRepositories.repositoreies";
import { IReadUserRepositories } from "../../../../../Domain/Modules/Identity/Repositories/ReadUserRepositories.repositories";
import { IReadApartmentDocumentRepo } from "../../../../../Domain/Modules/Housing/Repositories/Read/ReadApartmentDocument.repositories";
import { IUnitOfWork } from "../../../../../Domain/Shared/Repositories/UnitOfWorkRepositories.repositories";
import { IFileStorageService } from "../../../../Interfaces/IFileStorage.interface";
import { ApartmentDocumentType } from "../../../../../Domain/Shared/Enum/ApartmentDocument.enum";

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
  ): Promise<void> {
    try {
      // 1. Validate User
      const user = await this.readUserRepo.findById(command.userId);
      if (!user) throw new Error("User not found.");
      user.ensureAccountIsActive();

      // 2. Validate Landlord
      const landlord = await this.readLandlordRepo.findLandlordById(command.userId);
      if (!landlord) throw new Error("Landlord profile not found.");

      // 3. Validate Apartment
      const apartment = await this.readApartmentRepo.findApartmentByIdForLandlord(
        command.apartmentId,
        command.userId
      );

      if (!apartment) throw new Error("Apartment not found or does not belong to this landlord.");

      if (apartment.getIsVerified() === true) {
        throw new Error("Unable to update documents: Apartment is already verified.");
      }

      // 4. Retrieve Documents (Returns an Array)
      const apartmentDocuments = await this.readApartmentDocumentRepo.findApartmentDocumentByIdForLandlord(
        command.apartmentId,
        command.userId
      );

      // Guard: Check if array is valid
      if (!apartmentDocuments || apartmentDocuments.length === 0) {
        throw new Error("No existing documents found for this apartment.");
      }

      // --- CRITICAL FIX START ---
      // Old Code: const targetDocument = apartmentDocuments[0]; (BLINDLY PICKED FIRST)

      const targetDocument = apartmentDocuments.find(
        (doc: any) => doc.getApartmentDocumentId() === command.documentId
      );

      if (!targetDocument) {
        throw new Error(`Document with ID ${command.documentId} not found in this apartment.`);
      }

      // 5. Update File (If a new file was uploaded)
      if (command.documentUrl) {
        // Ensure the service call is safe
        const newFileUrl = await this.fileService.update(
          command.documentUrl,            // The new file object
          targetDocument.getDocumentUrl() // The old string URL
        );
        targetDocument.UpdateDocumentUrl(newFileUrl);
      }

      // 6. Update Type (If provided)
      if (command.apartmentType) {
        // Ensure we are checking against the correct Enum type
        targetDocument.UpdateApartmentType(command.apartmentType);
      }

      // 7. Save Changes
      await this.uow.startTransaction();
      try {
        await this.uow.writeApartmentDocumentRepo.updateApartmentDocument(targetDocument);
        await this.uow.commitTransaction();
      } catch (dbError) {
        await this.uow.rollbackTransaction();
        throw dbError;
      }

    } catch (error: any) {
      // Log the specific error to your console so you can see WHY it failed
      console.error("COMMAND HANDLER ERROR:", error);
      throw error;
    } finally {
      await this.uow.releaseTransaction();
    }
  }
}
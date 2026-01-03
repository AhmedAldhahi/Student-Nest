import { IReadApartmentDocumentRepo } from "../../../../../Domain/Modules/Housing/Repositories/Read/ReadApartmentDocument.repositories";
import { IReadApartmentRepo } from "../../../../../Domain/Modules/Housing/Repositories/Read/ReadApartmentRepo.repositoreis";
import { IUnitOfWork } from "../../../../../Domain/Shared/Repositories/UnitOfWorkRepositories.repositories";
import { IFileStorageService } from "../../../../Interfaces/IFileStorage.interface";
import { UpdateApartmentDocumentFileCommand } from "../../../Commands/Admin/updateApartmentDocumentFileCommand";
import { ICommandHandlers } from "../../../ICommandHandlers";

export class UpdateApartmentDocumentFileCommandHandler
  implements ICommandHandlers<UpdateApartmentDocumentFileCommand>
{
  constructor(
    private readonly uow: IUnitOfWork,
    private readonly readApartmentDocumentRepo: IReadApartmentDocumentRepo,
    private readonly readApartmentRepo: IReadApartmentRepo,
    private readonly fileService: IFileStorageService
  ) {}

  public async handle(command: UpdateApartmentDocumentFileCommand) {
    let transactionStarted = false;

    try {
      const documents =
        await this.readApartmentDocumentRepo.findApartmentDocumentById(
          command.documentId,
          command.userId
        );

      if (!documents || documents.length === 0) {
        throw new Error("Apartment document not found");
      }

      const targetDocument = documents.find(
        (d) => d.getDocumentUrl() === command.documentId
      );

      if (!targetDocument) {
        throw new Error("Target document not found");
      }

      const apartment = await this.readApartmentRepo.findApartmentById(
        targetDocument.getApartmentsId()
      );

      if (!apartment) {
        throw new Error("Associated apartment not found");
      }

      if (apartment.getIsVerified()) {
        throw new Error(
          "This apartment is verified. Documents cannot be modified."
        );
      }

      if (command.documentUrl) {
        const uploadedUrl = await this.fileService.upload(command.documentUrl);
        targetDocument.UpdateDocumentUrl(uploadedUrl);
      }

      if (command.apartmentType) {
        targetDocument.UpdateApartmentType(command.apartmentType);
      }

      await this.uow.startTransaction();
      transactionStarted = true;

      await this.uow.writeApartmentDocumentRepo.updateApartmentDocument(
        targetDocument
      );

      await this.uow.commitTransaction();

      return { message: "Document updated successfully" };
    } catch (error) {
      if (transactionStarted) {
        await this.uow.rollbackTransaction();
      }
      throw error;
    } finally {
      await this.uow.releaseTransaction();
    }
  }
}

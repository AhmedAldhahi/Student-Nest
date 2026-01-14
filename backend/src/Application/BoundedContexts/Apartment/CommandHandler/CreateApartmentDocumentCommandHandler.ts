import { v4 as uuidv4 } from "uuid";
import { AddApartmentDocumentCommand } from "../Command/CreateApartmentDocumentCommand";
import { ICommandHandlers } from "../../Shared/abstraction/ICommandHandler";
import { ApartmentDocumentEntity } from "../../../../Domain/BoundedContexts/Housing/Entities/apartmentDocumentEntity.entity";
import { ApartmentDocumentType } from "../../../../Domain/BoundedContexts/Housing/Enum/ApartmentDocument.enum";
import { IReadApartmentRepo } from "../../../../Domain/BoundedContexts/Housing/Repositories/ReadApartmentRepo.repositoreis";
import { IReadLandlordRepositories } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadLandlordRepositories.repositoreies";
import { IReadUserRepositories } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadUserRepositories.repositories";
import { IUnitOfWork } from "../../../../Domain/Shared/Repositories/UnitOfWorkRepositories.repositories";
import { IFileStorageService } from "../../../Interfaces/IFileStorage.interface";
import { CreateApartmentDocumentResponse } from "../Dto/Respone/CreateApartmentDocumentResponse";

export class CreateApartmentDocumentCommandHandler
  implements ICommandHandlers<AddApartmentDocumentCommand>
{
  constructor(
    private readonly readUserRepo: IReadUserRepositories,
    private readonly readLandlordRepo: IReadLandlordRepositories,
    private readonly readApartmentRepo: IReadApartmentRepo,
    private readonly uow: IUnitOfWork,
    private readonly fileService: IFileStorageService
  ) {}

  public async handle(
    command: AddApartmentDocumentCommand
  ): Promise<CreateApartmentDocumentResponse> {
    try {
      // 1. Validation
      const user = await this.readUserRepo.findById(command.userId);
      if (!user) throw new Error("user not found ");

      const landlord = await this.readLandlordRepo.findLandlordById(
        command.userId
      );
      if (!landlord) throw new Error("landlord not found ");

      user.ensureAccountIsActive();

      const apartment =
        await this.readApartmentRepo.findApartmentByIdForLandlord(
          command.apartmentId,
          command.userId
        );
      if (!apartment) throw new Error("apartment not found ");

      const documentUrl = await this.fileService.upload(
        command.apartmentDocument
      );

      // CRITICAL FIX: Check if upload failed (returned null/undefined)
      if (!documentUrl) {
        console.error(
          " Upload failed: Service returned null. Check .env keys."
        );
        throw new Error("Failed to upload document: No URL returned.");
      }

      // 3. Create Entity (Now in the correct scope)
      const apartmentDocumentId = uuidv4();

      const apartmentDocuments = new ApartmentDocumentEntity({
        apartmentDocumentId: apartmentDocumentId,
        documentUrl: documentUrl,
        apartmentType: ApartmentDocumentType.ApartmentVerifiedFile,
        apartmentsId: apartment.getApartmentId(), // Ensure this matches your DB column
      });

      landlord.AddApartmentDocumentFile(apartment, apartmentDocuments);

      // 5. Save to DB
      await this.uow.startTransaction();
      await this.uow.writeApartmentRepo.updateApartment(apartment);
      await this.uow.commitTransaction();

      return { message: "Document added successfully", url: documentUrl };
    } catch (error: any) {
      await this.uow.rollbackTransaction();
      console.error("fail to add apartment documents !!", error);
      throw error;
    } finally {
      await this.uow.releaseTransaction();
    }
  }
}

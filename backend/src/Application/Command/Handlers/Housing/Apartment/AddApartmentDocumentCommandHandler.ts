import { ApartmentDocumentEntity } from "../../../../../Domain/Modules/Housing/Entities/apartmentDocumentEntity.entity";
import { IReadApartmentRepo } from "../../../../../Domain/Modules/Housing/Repositories/Read/ReadApartmentRepo.repositoreis";
import { IReadLandlordRepositories } from "../../../../../Domain/Modules/Housing/Repositories/Read/ReadLandlordRepositories.repositoreies";
import { IReadUserRepositories } from "../../../../../Domain/Modules/Identity/Repositories/ReadUserRepositories.repositories";
import { ApartmentDocumentType } from "../../../../../Domain/Shared/Enum/ApartmentDocument.enum";
import { IUnitOfWork } from "../../../../../Domain/Shared/Repositories/UnitOfWorkRepositories.repositories";
import { IFileStorageService } from "../../../../Interfaces/IFileStorage.interface";
import { AddApartmentDocumentCommand } from "../../../Commands/Apartment/AddApartmentDocumentCommand";
import { ICommandHandlers } from "../../../ICommandHandlers";
import { v4 as uuidv4 } from "uuid";
export class AddApartmentDocumentCommandHandler
  implements ICommandHandlers<AddApartmentDocumentCommand>
{
  constructor(
    private readonly readUserRepo: IReadUserRepositories,
    private readonly readLandlordRepo: IReadLandlordRepositories,
    private readonly readApartmentRepo: IReadApartmentRepo,
    private readonly uow: IUnitOfWork,
    private readonly fileService: IFileStorageService
  ) {}

  public async handle(command: AddApartmentDocumentCommand): Promise<any> {
    try {
      const user = await this.readUserRepo.findById(command.userId);
      if (!user) {
        throw new Error("user not found ");
      }

      const landlord = await this.readLandlordRepo.findLandlordById(
        command.userId
      );

      if (!landlord) {
        throw new Error("landlord not found ");
      }

      user.ensureAccountIsActive();

      const apartment =
        await this.readApartmentRepo.findApartmentByIdForLandlord(
          command.apartmentId,
          command.userId
        );

      if (!apartment) {
        throw new Error("apartment not found ");
      }

      const document = await this.fileService.upload(command.apartmentDocument);

      const apartmentDocumentId = uuidv4();

      const apartmentDocuments = new ApartmentDocumentEntity({
        apartmentDocumentId: apartmentDocumentId,
        documentUrl: document,
        apartmentType: ApartmentDocumentType.ApartmentVerifiedFile,
        apartmentsId: apartment.getApartmentId(),
      });

      landlord.AddApartmentDocumentFile(apartment, apartmentDocuments);

      await this.uow.startTransaction();
      await this.uow.writeApartmentRepo.updateApartment(apartment);
      await this.uow.commitTransaction();
    } catch (error: any) {
      await this.uow.rollbackTransaction();
      console.error("fail to add apartment documents !!");
      throw error;
    } finally {
      await this.uow.releaseTransaction();
    }
  }
}

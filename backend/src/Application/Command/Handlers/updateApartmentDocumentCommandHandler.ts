import { IReadApartmentDocumentRepo } from "../../../Domain/Repositories/Read/ReadApartmentDocument.repositories";
import { IUnitOfWork } from "../../../Domain/Repositories/UnitOfWorkRepositories.repositories";
import { UpdateApartmentDocumentFileCommand } from "../Commands/updateApartmentDocumentFileCommand";
import { ICommandHandlers } from "../ICommandHandlers";

export class UpdateApartmentDocumentFileCommandHandler
  implements ICommandHandlers<UpdateApartmentDocumentFileCommand>
{
  constructor(
    private readonly uow: IUnitOfWork,
    private readonly ReadApartmentDocument: IReadApartmentDocumentRepo
  ) {}

  public async handle(
    command: UpdateApartmentDocumentFileCommand
  ): Promise<any> {
    try {
      const apartmentDocument =
        await this.ReadApartmentDocument.findApartmentDocumentById(command.id);

      if (!apartmentDocument) throw new Error("no apartment document Found !!");

      if (command.apartmentType) {
        apartmentDocument.UpdateApartmentType(command.apartmentType);
      }

      if (command.documentUrl) {
        apartmentDocument.UpdateDocumentUrl(command.documentUrl);
      }

      await this.uow.startTransaction();
      await this.uow.writeApartmentDocumentRepo.updateApartmentDocument(
        apartmentDocument
      );
      await this.uow.commitTransaction();
    } catch (error: any) {
      console.error("fail to update apartment documents !!");
      throw error;
    }
  }
}

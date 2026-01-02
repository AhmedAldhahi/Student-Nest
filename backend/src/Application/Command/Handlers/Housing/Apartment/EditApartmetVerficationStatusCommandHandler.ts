import { IReadApartmentRepo } from "../../../../../Domain/Modules/Housing/Repositories/Read/ReadApartmentRepo.repositoreis";
import { ApartmentDocumentType } from "../../../../../Domain/Shared/Enum/ApartmentDocument.enum";
import { IUnitOfWork } from "../../../../../Domain/Shared/Repositories/UnitOfWorkRepositories.repositories";
import { EditApartmentVerificationStatus } from "../../../Commands/Apartment/udateApartmentVerfiedSTatus.command";
import { ICommandHandlers } from "../../../ICommandHandlers";

export class EditApartmentStatusVerifiedCommandHandler
  implements ICommandHandlers<EditApartmentVerificationStatus>
{
  constructor(
    private readonly uow: IUnitOfWork,
    private readonly IReadApartmentRepo: IReadApartmentRepo
  ) {}
  public async handle(command: EditApartmentVerificationStatus): Promise<any> {
    try {
      const apartment = await this.IReadApartmentRepo.findApartmentById(
        command.apartmentId
      );

      if (!apartment) throw new Error("no apartment found !!");

      if (command.Verified === true) {
        if (
          apartment.getApartmentDocument()[0].getApartmentType() !==
          ApartmentDocumentType.ApartmentVerifiedFile
        ) {
          throw new Error(
            "you cannot verified this apartment the landlord must  to send apartment document for you to able to verified apartments !!"
          );
        }

        apartment.markAsVerified();
        apartment.markAsVisible();
      }

      if (command.Verified === false) {
        apartment.markAsNotVerified();
      }

      await this.uow.startTransaction();
      await this.uow.writeApartmentRepo.updateApartment(apartment);
      await this.uow.commitTransaction();
    } catch (error: any) {
      await this.uow.rollbackTransaction();
      console.error("fail to update apartment status !!");
    } finally {
      await this.uow.releaseTransaction();
    }
  }
}

import { IReadApartmentRepo } from "../../../Domain/Repositories/Read/ReadApartmentRepo.repositoreis";
import { IUnitOfWork } from "../../../Domain/Repositories/UnitOfWorkRepositories.repositories";
import { EditApartmentVerificationStatus } from "../Commands/udateApartmentVerfiedSTatus.command";
import { ICommandHandlers } from "../ICommandHandlers";

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
        apartment.markAsVerified();
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

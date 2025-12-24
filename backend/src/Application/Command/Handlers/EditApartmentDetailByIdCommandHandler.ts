import { IReadApartmentRepo } from "../../../Domain/Repositories/Read/ReadApartmentRepo.repositoreis";
import { IUnitOfWork } from "../../../Domain/Repositories/UnitOfWorkRepositories.repositories";
import { ApartmentPrice } from "../../../Domain/Value-Object/ApartmentPrice.vo";
import { numberOfBed } from "../../../Domain/Value-Object/NumberOfBed.vo";
import { NumberOfRoom } from "../../../Domain/Value-Object/NumberOfRoom.vo";
import { EditApartmentDetailByIdCommand } from "../Commands/EditApartmentCommand";
import { ICommandHandlers } from "../ICommandHandlers";

export class EditApartmentDetailByIdCommandHandler
  implements ICommandHandlers<EditApartmentDetailByIdCommand>
{
  constructor(
    private readonly readApartmentRepo: IReadApartmentRepo,
    private readonly uow: IUnitOfWork
  ) {}

  public async handle(command: EditApartmentDetailByIdCommand): Promise<any> {
    try {
      const apartment = await this.readApartmentRepo.findApartmentById(
        command.id
      );

      if (!apartment) throw new Error("no apartment found !!");

      if (command.address) apartment.updateAddress(command.address);

      if (command.description) apartment.updateDescription(command.description);

      if (command.isJoin) apartment.updateJoin(command.isJoin);

      if (command.numberOfBed)
        apartment.updateNumberOfBed(numberOfBed.create(command.numberOfBed));

      if (command.numberOfRoom)
        apartment.updateNumberOfRoom(NumberOfRoom.create(command.numberOfRoom));

      if (command.price)
        apartment.updateApartmentPrice(ApartmentPrice.create(command.price));

      if (command.title) apartment.updateTitle(command.title);

      await this.uow.startTransaction();
      await this.uow.writeApartmentRepo.updateApartment(apartment);
      await this.uow.commitTransaction();
    } catch (error: any) {
      await this.uow.rollbackTransaction();
      console.error("fail to update apartment details !!");
      throw error;
    } finally {
      await this.uow.releaseTransaction();
    }
  }
}

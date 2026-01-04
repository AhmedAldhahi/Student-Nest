import { IReadApartmentRepo } from "../../../../../Domain/Modules/Housing/Repositories/Read/ReadApartmentRepo.repositoreis";
import { IReadLandlordRepositories } from "../../../../../Domain/Modules/Housing/Repositories/Read/ReadLandlordRepositories.repositoreies";
import { NumberOfBed } from "../../../../../Domain/Modules/Housing/Value-Object/NumberOfBed.vo";
import { IReadUserRepositories } from "../../../../../Domain/Modules/Identity/Repositories/ReadUserRepositories.repositories";
import { IUnitOfWork } from "../../../../../Domain/Shared/Repositories/UnitOfWorkRepositories.repositories";
import { EditApartmentDetailByIdCommand } from "../../../Commands/Apartment/EditApartmentCommand";
import { ICommandHandlers } from "../../../ICommandHandlers";
import { NumberOfRoom } from "../../../../../Domain/Modules/Housing/Value-Object/NumberOfRoom.vo";
import { ApartmentPrice } from "../../../../../Domain/Modules/Housing/Value-Object/ApartmentPrice.vo";
import { IFileStorageService } from "../../../../Interfaces/IFileStorage.interface";
import { v4 as uuidv4 } from "uuid";
import { ApartmentPhotoDocumentEntity } from "../../../../../Domain/Modules/Housing/Entities/phohtoDocumentEntity.entity";

export class EditApartmentDetailForLandlordCommandHandler
  implements ICommandHandlers<EditApartmentDetailByIdCommand>
{
  constructor(
    private readonly uow: IUnitOfWork,
    private readonly readApartmentRepo: IReadApartmentRepo,
    private readonly readUserRepo: IReadUserRepositories,
    private readonly readLandlordRepo: IReadLandlordRepositories,
    private readonly fileService: IFileStorageService
  ) {}

  public async handle(command: EditApartmentDetailByIdCommand): Promise<any> {
    try {
      const user = await this.readUserRepo.findById(command.userId);
      if (!user) throw new Error("no user been found !!");

      const landlord = await this.readLandlordRepo.findLandlordById(
        command.userId
      );

      user.ensureAccountIsActive();

      if (!landlord) throw new Error("no landlord been found !!");

      const apartment =
        await this.readApartmentRepo.findApartmentByIdForLandlord(
          command.id,
          command.userId
        );

      if (!apartment) throw new Error("no apartment been found !!");

      //TODO: need to fix price when it have student must throw error

      if (command.address) apartment.updateAddress(command.address);

      if (command.description) apartment.updateDescription(command.description);

      if (command.isJoin) apartment.updateIsJoin(command.isJoin);

      if (command.numberOfBed)
        apartment.updateNumberOfBed(NumberOfBed.create(command.numberOfBed));
      if (command.numberOfRoom)
        apartment.updateNumberOfRoom(NumberOfRoom.create(command.numberOfRoom));

      if (command.title) apartment.updateTitle(command.title);

      if (command.price)
        apartment.changeApartmentPricing(ApartmentPrice.create(command.price));

      const currentPhotos = apartment.getApartmentPhotoDocument();
      let createdPhotos = command.photos || [];

      const finalCount = currentPhotos.length + createdPhotos.length;

      if (finalCount > 6)
        throw new Error("Limited exceed, you can not have more that 6 photo");

      if (finalCount < 1)
        throw new Error("Limited Exceed , you can not have less than 1");

      if (createdPhotos.length > 0) {
        for (const file of createdPhotos) {
          const photoUrl = await this.fileService.upload(file);
          const photoId = uuidv4();

          const newPhoto = new ApartmentPhotoDocumentEntity({
            photoId: photoId,
            photoUrl: photoUrl,
          });

          apartment.addPhoto(newPhoto);
        }
      }

      await this.uow.startTransaction();
      try {
        await this.uow.writeApartmentRepo.updateApartment(apartment);
        await this.uow.commitTransaction();
      } catch (errorDB: any) {
        await this.uow.rollbackTransaction();
        console.error("Database Error during transaction");
        throw errorDB;
      }
    } catch (error: any) {
      await this.uow.rollbackTransaction();
      console.error("fail to update apartment details !!", error);
      throw error;
    } finally {
      await this.uow.releaseTransaction();
    }
  }
}

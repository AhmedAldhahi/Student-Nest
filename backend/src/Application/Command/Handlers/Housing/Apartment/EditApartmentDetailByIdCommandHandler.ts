import { IReadApartmentRepo } from "../../../../../Domain/Modules/Housing/Repositories/Read/ReadApartmentRepo.repositoreis";
import { IUnitOfWork } from "../../../../../Domain/Shared/Repositories/UnitOfWorkRepositories.repositories";
import { ApartmentPrice } from "../../../../../Domain/Modules/Housing/Value-Object/ApartmentPrice.vo";
import { NumberOfBed } from "../../../../../Domain/Modules/Housing/Value-Object/NumberOfBed.vo";
import { NumberOfRoom } from "../../../../../Domain/Modules/Housing/Value-Object/NumberOfRoom.vo";
import { IFileStorageService } from "../../../../Interfaces/IFileStorage.interface";
import { EditApartmentDetailByIdCommand } from "../../../Commands/Apartment/EditApartmentCommand";
import { ICommandHandlers } from "../../../ICommandHandlers";

export class EditApartmentDetailByIdCommandHandler
  implements ICommandHandlers<EditApartmentDetailByIdCommand>
{
  constructor(
    private readonly readApartmentRepo: IReadApartmentRepo,
    private readonly uow: IUnitOfWork,
    private readonly fileStorageService: IFileStorageService
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
        apartment.updateNumberOfBed(NumberOfBed.create(command.numberOfBed));

      if (command.numberOfRoom)
        apartment.updateNumberOfRoom(NumberOfRoom.create(command.numberOfRoom));

      if (command.price)
        apartment.changeApartmentPricing(ApartmentPrice.create(command.price));

      if (command.title) apartment.updateTitle(command.title);

      if (command.photos) {
        // 1. Get current photos from Database
        const currentPhotos = apartment.getApartmentPhotoDocument();

        // 2. Get the new "Final List" from the Command
        const newPhotoList = command.photos;

        // 3. Find photos that are in DB but MISSING from the new list
        // These are the ones the user deleted from the UI
        const photosToDelete = currentPhotos.filter((dbPhoto) => {
          // Keep the photo if its ID exists in the new list
          const existsInNewList = newPhotoList.some(
            (newP) => newP.getPhotoId() === dbPhoto.getPhotoId()
          );
          return !existsInNewList; // Return true if it does NOT exist (to delete it)
        });

        // 4. Delete them from Cloudinary
        for (const photo of photosToDelete) {
          const url = photo.getPhotoUrl();

          if (url) {
            console.log(`Deleting image from Cloudinary: ${url}`);
            await this.fileStorageService.deleteImageFromCloudinary(url);
          }
        }
      }

      await this.uow.startTransaction();
      await this.uow.writeApartmentRepo.updateApartment(apartment);
      await this.uow.commitTransaction();
    } catch (error: any) {
      await this.uow.rollbackTransaction();
      console.error("fail to update apartment details !!", error);
      throw error;
    } finally {
      await this.uow.releaseTransaction();
    }
  }
}

import { IReadApartmentRepo } from "../../../../../Domain/Modules/Housing/Repositories/Read/ReadApartmentRepo.repositoreis";
import { IUnitOfWork } from "../../../../../Domain/Shared/Repositories/UnitOfWorkRepositories.repositories";
import { IFileStorageService } from "../../../../Interfaces/IFileStorage.interface";
import { deleteApartmentByIdCommand } from "../../../Commands/Apartment/DeleteApartmentByIdCommand";
import { ICommandHandlers } from "../../../ICommandHandlers";

export class deleteApartmentByIdCommandHandler
  implements ICommandHandlers<deleteApartmentByIdCommand>
{
  constructor(
    private readonly uow: IUnitOfWork,
    private readonly ReadApartmentRepo: IReadApartmentRepo,
    private readonly fileService: IFileStorageService
  ) {}

  public async handle(command: deleteApartmentByIdCommand): Promise<any> {
    try {
      const apartment = await this.ReadApartmentRepo.findApartmentById(
        command.id
      );

      if (!apartment) throw new Error("No apartment with this id found !!");

      const files = apartment.getApartmentDocument();

      const photos = apartment.getApartmentPhotoDocument();

      if (files) {
        for (let i: number = 0; i < files.length; i++) {
          try {
            await this.fileService.deleteImageFromCloudinary(
              files[i].getDocumentUrl()
            );
          } catch (error: any) {
            // CHANGE: Just log the error, do NOT throw it.
            // This ensures the loop finishes and we move on to DB deletion.
            console.error(
              `Failed to delete image: ${files[
                i
              ].getDocumentUrl()}. Proceeding anyway...`,
              error.message
            );
          }
        }
      }

      if (photos) {
        for (let i: number = 0; i < photos.length; i++) {
          try {
            await this.fileService.deleteImageFromCloudinary(
              photos[i].getPhotoUrl()
            );
          } catch (error: any) {
            // CHANGE: Just log the error, do NOT throw it.
            // This ensures the loop finishes and we move on to DB deletion.
            console.error(
              `Failed to delete image: ${photos[
                i
              ].getPhotoUrl()}. Proceeding anyway...`,
              error.message
            );
          }
        }
      }

      // The code reaches here even if Cloudinary fails
      await this.uow.startTransaction();
      await this.uow.writeApartmentRepo.deleteApartmentById(command.id);
      await this.uow.commitTransaction();
    } catch (error: any) {
      // This catch block now only handles Database errors
      await this.uow.rollbackTransaction();
      console.error("Failed to delete apartment from database !!");
      throw error;
    } finally {
      await this.uow.releaseTransaction();
    }
  }
}

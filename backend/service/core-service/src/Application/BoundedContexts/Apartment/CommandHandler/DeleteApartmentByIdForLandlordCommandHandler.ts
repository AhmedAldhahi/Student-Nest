import { IReadApartmentRepo } from "../../../../Domain/BoundedContexts/Housing/Repositories/ReadApartmentRepo.repositoreis";
import { IUnitOfWork } from "../../../../Domain/Shared/Repositories/UnitOfWorkRepositories.repositories";
import { IFileStorageService } from "../../../Interfaces/IFileStorage.interface";
import { ICommandHandlers } from "../../Shared/abstraction/ICommandHandler";
import { deleteApartmentByIdCommand } from "../Command/DeleteApartmentByIdCommand";
import { DeleteApartmentResponse } from "../Dto/Respone/DeleteApartmentResponse";

export class deleteApartmentByIdForLandlordCommandHandler
  implements ICommandHandlers<deleteApartmentByIdCommand>
{
  constructor(
    private readonly uow: IUnitOfWork,
    private readonly ReadApartmentRepo: IReadApartmentRepo,
    private readonly fileService: IFileStorageService
  ) {}

  public async handle(
    command: deleteApartmentByIdCommand
  ): Promise<DeleteApartmentResponse> {
    try {
      const apartment =
        await this.ReadApartmentRepo.findApartmentForLandlordById(
          command.id,
          command.userId
        );

      if (!apartment) throw new Error("No apartment with this id found !!");

      const files = apartment.getApartmentDocument();

      const photos = apartment.getApartmentPhotoDocument();

      if (files) {
        try {
          await this.fileService.deleteImageFromCloudinary(
            files.getDocumentUrl()
          );
        } catch (error: any) {
          console.error("fail to delete from cloudinary Service", error);
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
      await this.uow.writeApartmentRepo.deleteApartmentByIdForLandlord(
        command.id,
        command.userId
      );
      await this.uow.commitTransaction();

      return {
        message: "apartment deleted successful",
      };
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

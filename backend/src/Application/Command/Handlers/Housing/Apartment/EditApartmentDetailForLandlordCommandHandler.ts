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

      // Step B: Prepare a list that we will modify
      const updatedPhotoList = [...currentPhotos];

      // Step C: Upload and APPEND new photos
      const newFiles = command.photos || [];

      if (newFiles.length > 0) {
        for (const file of newFiles) {
          const photoUrl = await this.fileService.upload(file);
          const photoId = uuidv4();

          const newPhotoEntity = new ApartmentPhotoDocumentEntity({
            photoId: photoId,
            photoUrl: photoUrl,
          });

          //  JUST PUSH (Add to the end)
          updatedPhotoList.push(newPhotoEntity);
        }
      }

      // Step D: Validate Total Count
      if (updatedPhotoList.length > 6) {
        throw new Error(
          `Limit exceeded: You have ${currentPhotos.length} existing + ${newFiles.length} new = ${updatedPhotoList.length}. Max is 6.`
        );
      }

      if (updatedPhotoList.length < 1) {
        throw new Error(
          "Limited exceeded: You must have at lease one photo !!"
        );
      }

      await this.uow.startTransaction();
      try {
        await this.uow.writeApartmentRepo.updateApartment(apartment);
        await this.uow.commitTransaction();

        return {
          apartmentId: apartment.getApartmentId(),
          isVisible: apartment.getIsVisible(),
          price: apartment.getApartmentPrice(),
          title: apartment.getTitle(),
          description: apartment.getDescription(),
          address: apartment.getAddress(),
          createAt: apartment.getCreateAt(),
          updateAt: apartment.getUpdateAt(),
          numberOfBed: apartment.getNumberOfBed(),
          numberOfRoom: apartment.getNumberOfRoom(),

          apartmentPhoto: apartment.getApartmentPhotoDocument(),
          googleMapLocation: apartment.getGoogleMapLocation(),
          landlordId: apartment.getLandlord(),
          isJoin: apartment.getIsJoin(),
          IsVerified: apartment.getIsVerified(),
          landlordName: user.getName()?.valueOf(),
        };
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

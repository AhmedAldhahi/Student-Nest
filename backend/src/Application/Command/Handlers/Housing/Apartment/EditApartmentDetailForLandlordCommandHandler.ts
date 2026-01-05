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
    // We declare this outside to use it in the finally/success blocks
    let oldPhotosUrlsToDelete: string[] = [];

    try {
      // ---------------------------------------------------------
      // 1. Validation & Retrieval
      // ---------------------------------------------------------
      const user = await this.readUserRepo.findById(command.userId);
      if (!user) throw new Error("User not found !!");

      const landlord = await this.readLandlordRepo.findLandlordById(command.userId);
      
      user.ensureAccountIsActive();

      if (!landlord) throw new Error("Landlord account not found !!");

      const apartment = await this.readApartmentRepo.findApartmentByIdForLandlord(
        command.id,
        command.userId
      );

      if (!apartment) throw new Error("Apartment not found !!");

      // ---------------------------------------------------------
      // 2. Update Scalar Fields
      // ---------------------------------------------------------
      // TODO: need to fix price when it have student must throw error
      
      if (command.address) apartment.updateAddress(command.address);
      if (command.description) apartment.updateDescription(command.description);
      // Explicit check for undefined so false values are not ignored
      if (command.isJoin !== undefined) apartment.updateIsJoin(command.isJoin);
      if (command.title) apartment.updateTitle(command.title);

      if (command.numberOfBed) {
        apartment.updateNumberOfBed(NumberOfBed.create(command.numberOfBed));
      }
      if (command.numberOfRoom) {
        apartment.updateNumberOfRoom(NumberOfRoom.create(command.numberOfRoom));
      }
      if (command.price) {
        apartment.changeApartmentPricing(ApartmentPrice.create(command.price));
      }

      // ---------------------------------------------------------
      // 3. Photo Handling (Upload Strategy)
      // ---------------------------------------------------------
      const newFiles = command.photos || [];

      // Only enter photo logic if new files are actually provided
      if (newFiles.length > 0) {
        const currentPhotos = apartment.getApartmentPhotoDocument();

        // A. Validation
        if (newFiles.length > 6) {
          throw new Error(`Limit exceeded: Max 6 photos allowed.`);
        }
        if (newFiles.length < 1) {
          throw new Error(`Constraint violation: Must have at least one photo.`);
        }

        // B. Prepare Old Photos for Deletion (But don't delete yet!)
        oldPhotosUrlsToDelete = currentPhotos.map(p => p.getPhotoUrl());

        // C. Upload New Photos to Cloudinary
        const newPhotoEntities: ApartmentPhotoDocumentEntity[] = [];

        for (const file of newFiles) {
          const photoUrl = await this.fileService.upload(file);
          
          newPhotoEntities.push(
            new ApartmentPhotoDocumentEntity({
              photoId: uuidv4(),
              photoUrl: photoUrl,
            })
          );
        }

        // D. Update Entity
        // NOTE: Ensure your Apartment Entity has a method to replace the photo list
        // e.g., public updatePhotos(photos: ApartmentPhotoDocumentEntity[])
        apartment.updatePhotos(newPhotoEntities); 
      }

      // ---------------------------------------------------------
      // 4. Persistence (Transaction)
      // ---------------------------------------------------------
      await this.uow.startTransaction();
      
      try {
        await this.uow.writeApartmentRepo.updateApartment(apartment);
        await this.uow.commitTransaction();
      } catch (errorDB: any) {
        await this.uow.rollbackTransaction();
        console.error("Database Error during transaction", errorDB);
        throw errorDB;
      }

      // ---------------------------------------------------------
      // 5. Post-Commit Cleanup (Safe Side Effects)
      // ---------------------------------------------------------
      // Only now, after the DB is safely updated, do we delete the old images
      if (oldPhotosUrlsToDelete.length > 0) {
        // We use Promise.allSettled so one failure doesn't crash the response
        Promise.allSettled(
          oldPhotosUrlsToDelete.map(url => this.fileService.deleteImageFromCloudinary(url))
        ).then(results => {
             // Optional: Log failures if needed
             console.log("Cleanup complete");
        });
      }

      // ---------------------------------------------------------
      // 6. Return Response
      // ---------------------------------------------------------
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

    } catch (error: any) {
      console.error("Fail to update apartment details !!", error);
      // If we failed BEFORE DB commit, the transaction rollback handles data.
      // Ideally, you might want to delete the *NEW* photos from Cloudinary here 
      // if the process failed, to avoid orphaned files, but that is an optimization.
      throw error;
    } finally {
      await this.uow.releaseTransaction();
    }
  }
}
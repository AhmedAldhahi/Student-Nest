import { ApartmentAggregateRoot } from "../../../../../Domain/Modules/Housing/AgregateRoot/apartmentEntity.entity";
import { ApartmentPrice } from "../../../../../Domain/Modules/Housing/Value-Object/ApartmentPrice.vo";
import { NumberOfBed } from "../../../../../Domain/Modules/Housing/Value-Object/NumberOfBed.vo";
import { NumberOfRoom } from "../../../../../Domain/Modules/Housing/Value-Object/NumberOfRoom.vo";
import { IReadUserRepositories } from "../../../../../Domain/Modules/Identity/Repositories/ReadUserRepositories.repositories";
import { IUnitOfWork } from "../../../../../Domain/Shared/Repositories/UnitOfWorkRepositories.repositories";
import { IFileStorageService } from "../../../../Interfaces/IFileStorage.interface";
import { CreateApartmentCommand } from "../../../Commands/Apartment/CreateApartmentCommand";
import { ICommandHandlers } from "../../../ICommandHandlers";
import { IReadLandlordRepositories } from "../../../../../Domain/Modules/Housing/Repositories/Read/ReadLandlordRepositories.repositoreies";
import { ApartmentDocumentEntity } from "../../../../../Domain/Modules/Housing/Entities/apartmentDocumentEntity.entity";
import { GoogleMapLocationEntity } from "../../../../../Domain/Modules/Housing/Entities/googleMapLocationEntity.entity";
import { ApartmentPhotoDocumentEntity } from "../../../../../Domain/Modules/Housing/Entities/phohtoDocumentEntity.entity";
import { ApartmentDocumentType } from "../../../../../Domain/Shared/Enum/ApartmentDocument.enum";
import { v4 as uuidv4 } from "uuid";
export class CreateApartmentCommandHandler
  implements ICommandHandlers<CreateApartmentCommand>
{
  constructor(
    private readonly uow: IUnitOfWork,
    private readonly fileService: IFileStorageService,
    private readonly readUserRepo: IReadUserRepositories,
    private readonly readLandlordRepo: IReadLandlordRepositories
  ) {}

  public async handle(command: CreateApartmentCommand) {
    try {
      const user = await this.readUserRepo.findById(command.landlord);

      if (!user) throw new Error("no user been found !!");

      const landlord = await this.readLandlordRepo.findLandlordById(
        command.landlord
      );

      if (!landlord) throw new Error("no user been found !!");

      user.ensureAccountIsActive();

      const photoEntities: ApartmentPhotoDocumentEntity[] = [];

      if (command.apartmentPhoto && command.apartmentPhoto.length > 0) {
        for (const file of command.apartmentPhoto) {
          const photoUrl = await this.fileService.upload(file);
          const photoId = uuidv4();
          // Create the Child Entity
          photoEntities.push(
            new ApartmentPhotoDocumentEntity({ photoId, photoUrl })
          );
        }
      }

      const docEntities: ApartmentDocumentEntity[] = [];
      if (command.apartmentDocument && command.apartmentDocument.length > 0) {
        for (const file of command.apartmentDocument) {
          const url = await this.fileService.upload(file);
          const apartmentId = uuidv4();

          // Create the Child Entity
          docEntities.push(
            new ApartmentDocumentEntity({
              apartmentId,
              documentUrl: url,
              apartmentType: ApartmentDocumentType.ApartmentVerifiedFile,
            })
          );
        }
      }

      // 3. Create Value Objects
      const locationId = uuidv4();
      const location = new GoogleMapLocationEntity({
        placeId: locationId,
        longitude: command.googleMapLocationLong,
        latitude: command.googleMapLocationLat,
      });

      const apartmentId = uuidv4();
      const apartment = new ApartmentAggregateRoot({
        apartmentId: apartmentId,
        propertyStatus: command.propertyStatus,
        price: ApartmentPrice.create(command.price),
        title: command.title,
        description: command.description,
        address: command.address,
        createAt: command.createAt,
        updateAt: command.updateAt,
        numberOfBed: NumberOfBed.create(command.numberOfBed),
        numberOfRoom: NumberOfRoom.create(command.numberOfRoom),

        apartmentDocument: docEntities,
        apartmentPhoto: photoEntities,
        googleMapLocation: location,
        landlordId: landlord.getUserId(),
        isFully: false,
        isJoin: command.isJoin,
        Verified: false,
      });

      // for photo
      for (let i = 0; i < command.apartmentPhoto.length; i++) {
        await this.fileService.upload(command.apartmentPhoto[i]);
      }

      // for apartment documents
      for (let i = 0; i < command.apartmentDocument.length; i++) {
        await this.fileService.upload(command.apartmentDocument[i]);
      }

      await this.uow.startTransaction();
      await this.uow.writeApartmentRepo.InsertApartment(apartment);
      await this.uow.commitTransaction();

      return {
        apartmentId: apartmentId,
        propertyStatus: command.propertyStatus,
        price: ApartmentPrice.create(command.price).getValue(),
        title: command.title,
        description: command.description,
        address: command.address,
        createAt: command.createAt,
        updateAt: command.updateAt,
        numberOfBed: NumberOfBed.create(command.numberOfBed).getValue(),
        numberOfRoom: NumberOfRoom.create(command.numberOfRoom).getValue(),

        apartmentDocument: docEntities,
        apartmentPhoto: photoEntities,
        googleMapLocation: location,
        landlordId: landlord.getUserId(),
        isFully: false,
        isJoin: command.isJoin,
        Verified: false,
      };
    } catch (error: any) {
      await this.uow.rollbackTransaction();
      console.error("fail to create apartments !!");
      throw error;
    } finally {
      await this.uow.releaseTransaction();
    }
  }
}

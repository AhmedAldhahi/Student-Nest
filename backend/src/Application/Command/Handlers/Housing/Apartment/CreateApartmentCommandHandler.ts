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
import { GoogleMapLocationEntity } from "../../../../../Domain/Modules/Housing/Entities/googleMapLocationEntity.entity";
import { ApartmentPhotoDocumentEntity } from "../../../../../Domain/Modules/Housing/Entities/phohtoDocumentEntity.entity";
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
      const apartmentId = uuidv4();
      
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

      // 3. Create Value Objects
      const locationId = uuidv4();
      const location = new GoogleMapLocationEntity({
        placeId: locationId,
        longitude: command.googleMapLocationLong,
        latitude: command.googleMapLocationLat,
      });

      const apartment = new ApartmentAggregateRoot({
        apartmentId: apartmentId,
        isVisible: false,
        title: command.title,
        description: command.description,
        address: command.address,
        IsVerified: false,
        isJoin: command.isJoin,
        numberOfBed: NumberOfBed.create(command.numberOfBed),
        numberOfRoom: NumberOfRoom.create(command.numberOfRoom),
        price: ApartmentPrice.create(command.price),
        createAt: command.createAt,
        updateAt: command.updateAt,
        apartmentPhoto: photoEntities,
        apartmentDocument: [],
        googleMapLocation: location,
        landlordId: landlord.getUserId(),
      });

      landlord.addNewApartment(apartment);

      await this.uow.startTransaction();
      await this.uow.writeApartmentRepo.InsertApartment(apartment);
      await this.uow.commitTransaction();

      return {
        apartmentId: apartmentId,
        isVisible: false,
        price: ApartmentPrice.create(command.price).getValue(),
        title: command.title,
        description: command.description,
        address: command.address,
        createAt: command.createAt,
        updateAt: command.updateAt,
        numberOfBed: NumberOfBed.create(command.numberOfBed).getValue(),
        numberOfRoom: NumberOfRoom.create(command.numberOfRoom).getValue(),

        apartmentPhoto: photoEntities,
        googleMapLocation: location,
        landlordId: landlord.getUserId(),
        isJoin: command.isJoin,
        IsVerified: false,
        landlordName: user.getName()?.valueOf(),
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

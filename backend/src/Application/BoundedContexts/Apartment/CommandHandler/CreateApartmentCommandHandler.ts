import { v4 as uuidv4 } from "uuid";
import { CreateApartmentCommand } from "../Command/CreateApartmentCommand";
import { ICommandHandlers } from "../../Shared/abstraction/ICommandHandler";
import { ApartmentAggregateRoot } from "../../../../Domain/BoundedContexts/Housing/AgregateRoot/apartmentEntity.entity";
import { GoogleMapLocationEntity } from "../../../../Domain/BoundedContexts/Housing/Entities/googleMapLocationEntity.entity";
import { ApartmentPhotoDocumentEntity } from "../../../../Domain/BoundedContexts/Housing/Entities/phohtoDocumentEntity.entity";
import { ApartmentPrice } from "../../../../Domain/BoundedContexts/Housing/Value-Object/ApartmentPrice.vo";
import { NumberOfBed } from "../../../../Domain/BoundedContexts/Housing/Value-Object/NumberOfBed.vo";
import { NumberOfRoom } from "../../../../Domain/BoundedContexts/Housing/Value-Object/NumberOfRoom.vo";
import { IReadLandlordRepositories } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadLandlordRepositories.repositoreies";
import { IReadUserRepositories } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadUserRepositories.repositories";
import { IUnitOfWork } from "../../../../Domain/Shared/Repositories/UnitOfWorkRepositories.repositories";
import { IFileStorageService } from "../../../Interfaces/IFileStorage.interface";
import { CreateApartmentResponse } from "../Dto/Respone/CreateApartmentResponse";
import { HouseRule } from "../../../../Domain/BoundedContexts/Housing/Value-Object/HouseRole.vo";

export class CreateApartmentCommandHandler implements ICommandHandlers<CreateApartmentCommand> {
  constructor(
    private readonly uow: IUnitOfWork,
    private readonly fileService: IFileStorageService,
    private readonly readUserRepo: IReadUserRepositories,
    private readonly readLandlordRepo: IReadLandlordRepositories,
  ) {}

  public async handle(
    command: CreateApartmentCommand,
  ): Promise<CreateApartmentResponse> {
    try {
      const user = await this.readUserRepo.findById(command.landlord);
      if (!user) throw new Error("no user been found !!");

      const landlord = await this.readLandlordRepo.findLandlordById(
        command.landlord,
      );
      if (!landlord) throw new Error("no user been found !!");

      user.ensureAccountIsActive();
      landlord.ensureIsLandlordVerified();

      // 1. Upload Photos
      const photoEntities: ApartmentPhotoDocumentEntity[] = [];
      const apartmentId = uuidv4();

      if (command.apartmentPhoto && command.apartmentPhoto.length > 0) {
        for (const file of command.apartmentPhoto) {
          const photoUrl = await this.fileService.upload(file);
          const photoId = uuidv4();
          photoEntities.push(
            new ApartmentPhotoDocumentEntity({ photoId, photoUrl }),
          );
        }
      }

      // 2. Create Location Value Object
      const locationId = uuidv4();
      const location = new GoogleMapLocationEntity({
        placeId: locationId,
        longitude: command.googleMapLocationLong,
        latitude: command.googleMapLocationLat,
      });

      // 3. Create Apartment Aggregate
      const apartment = new ApartmentAggregateRoot({
        apartmentId: apartmentId,
        isVisible: false,
        title: command.title,
        description: command.description,
        address: command.address,
        houseRule: HouseRule.create(command.houseRule),
        includeUtilities: command.includeUtilities,
        IsVerified: false,
        isJoin: command.isJoin,
        numberOfBed: NumberOfBed.create(command.numberOfBed),
        numberOfRoom: NumberOfRoom.create(command.numberOfRoom),
        price: ApartmentPrice.create(command.price),
        createAt: command.createAt,
        updateAt: command.updateAt,
        apartmentPhoto: photoEntities,
        apartmentDocument: null,
        googleMapLocation: location,
        landlordId: landlord.getUserId(),
      });

      // 4. Save to Database
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
        isVerified: false,

        landlordName: user.getName()?.valueOf(),
      };
    } catch (error: any) {
      await this.uow.rollbackTransaction();
      throw error;
    } finally {
      await this.uow.releaseTransaction();
    }
  }
}

import { ApartmentEntity } from "../../../Domain/AggregatesRoot/apartmentEntity.entity";
import { IReadApartmentRepo } from "../../../Domain/Repositories/Read/ReadApartmentRepo.repositoreis";
import { AppDataSource } from "../../Database/orm/TypeOrm/data-source";
import { ApartmentModel } from "../../Database/orm/TypeOrm/entity/Apartment.entity";
import { ApartmentMapper } from "../mapper/apartment.mapper";

export class ReadApartmentRepositories implements IReadApartmentRepo {
  public async findAllApartment(): Promise<ApartmentEntity[] | null> {
    try {
      const apartmentRepo =
        AppDataSource.getInstance().getRepository(ApartmentModel);

      const apartments = await apartmentRepo.find({
        // 1. SELECT: Here you pick the Columns
        select: {
          apartmentId: true,
          propertyStatus: true,
          title: true,
          description: true,
          address: true,
          isJoin: true,
          createAt: true,
          updateAt: true,
          isFully: true,
          price: true,
          Verified: true,
          numberOfBed: true,
          numberOfRoom: true,

          landlord: {
            userId: true, // Select column here
            user: {
              Name: true, // Select column here
            },
          },
          location: {
            latitude: true,
            longitude: true,
          },
          documents: {
            documentUrl: true,
            apartmentType: true,
          },
        },

        // 2. RELATIONS: Here you ONLY pick the Tables to join
        relations: {
          landlord: {
            user: true, // Join Landlord -> User
          },
          location: true, // Join Apartment -> Location
          documents: true, // Join Apartment -> Documents
        },
      });

      if (!apartments || apartments.length === 0) {
        return null;
      }

      return apartments.map((apt) => ApartmentMapper.toEntity(apt));
    } catch (error: any) {
      console.error("Error finding apartments:", error);
      throw new Error("Unable to retrieve apartments.");
    }
  }
}
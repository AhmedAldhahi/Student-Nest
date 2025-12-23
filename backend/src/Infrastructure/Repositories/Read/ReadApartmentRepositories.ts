import { Like } from "typeorm";
import { IApartmentDTO } from "../../../Application/Dtos/admin/ApartmentDTo.dtos";
import { IReadApartmentRepo } from "../../../Domain/Repositories/Read/ReadApartmentRepo.repositoreis";
import { AppDataSource } from "../../Database/orm/TypeOrm/data-source";
import { ApartmentModel } from "../../Database/orm/TypeOrm/entity/Apartment.entity";
import { ApartmentMapper } from "../mapper/apartment.mapper";
import { ApartmentAggregateRoot } from "../../../Domain/AggregatesRoot/apartmentEntity.entity";

export class ReadApartmentRepositories implements IReadApartmentRepo {
  public async findAllApartment(): Promise<IApartmentDTO[] | null> {
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
        return [];
      }

      return apartments.map((apt) => ApartmentMapper.toResponses(apt));
    } catch (error: any) {
      console.error("Error finding apartments:", error);
      throw new Error("Unable to retrieve apartments.");
    }
  }

  public async findApartmentName(
    prefix: string
  ): Promise<IApartmentDTO[] | null> {
    try {
      const apartmentRepo =
        AppDataSource.getInstance().getRepository(ApartmentModel);

      const apartments = await apartmentRepo.find({
        // 2. FIX: Remove double curly braces {{ }}
        where: {
          title: Like(`${prefix}%`),
        },

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
            userId: true,
            user: {
              Name: true,
            },
          },
          location: {
            googleMapLocationId: true, // Don't forget the ID!
            latitude: true,
            longitude: true,
          },
          documents: {
            apartmentDocumentId: true, // Don't forget the ID!
            documentUrl: true,
            apartmentType: true,
          },
        },

        relations: {
          landlord: {
            user: true,
          },
          location: true,
          documents: true,
        },
      });

      if (!apartments || apartments.length === 0) {
        return [];
      }

      // 3. FIX: Properly close the map function and use the correct Mapper method
      // Assuming 'toResponses' is your DTO mapper from the previous method
      return apartments.map((orm) => ApartmentMapper.toResponses(orm));
    } catch (error: any) {
      console.error("Error searching apartment name:", error);
      throw new Error(`Unable to search apartments: ${error.message}`);
    }
  }

  public async findApartmentById(id: number): Promise<ApartmentAggregateRoot | null> {
    try {
      const apartment = await AppDataSource.getInstance()
        .getRepository(ApartmentModel)
        .findOne({
          where: { apartmentId: id },
          relations: {
            landlord: { user: true },
            documents: true,
            location: true,
          },
        });

      return apartment ? ApartmentMapper.toEntity(apartment) : null;
    } catch (error) {
      console.error("Error finding landlord by ID:", error);
      throw new Error("Error retrieving landlord data");
    }
  }
}

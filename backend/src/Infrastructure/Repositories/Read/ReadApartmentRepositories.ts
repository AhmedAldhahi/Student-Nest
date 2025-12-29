import { FindOptionsWhere, Like } from "typeorm";

import { IReadApartmentRepo } from "../../../Domain/Repositories/Read/ReadApartmentRepo.repositoreis";
import { AppDataSource } from "../../Database/orm/TypeOrm/data-source";
import { ApartmentModel } from "../../Database/orm/TypeOrm/entity/Apartment.entity";
import { ApartmentMapper } from "../mapper/apartment.mapper";
import { ApartmentAggregateRoot } from "../../../Domain/AggregatesRoot/apartmentEntity.entity";
import {
  IApartmentSimpleDTO,
  IApartmentDTO,
} from "../../../Application/DTO/admin/ApartmentDTo.dto";

export class ReadApartmentRepositories implements IReadApartmentRepo {
  public async findAllApartment(): Promise<IApartmentSimpleDTO[] | null> {
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
            userId: true,
            user: {
              Name: true,
            },
          },
        },

        // 2. RELATIONS: Here you ONLY pick the Tables to join
        relations: {
          landlord: {
            user: true, // Join Landlord -> User
          },
          photos: true,
        },
      });

      if (!apartments || apartments.length === 0) {
        return [];
      }

      return apartments.map((apt) => ApartmentMapper.toResponsesSimple(apt));
    } catch (error: any) {
      console.error("Error finding apartments:", error);
      throw new Error("Unable to retrieve apartments.");
    }
  }

  public async findApartmentByQuery(
    prefix: string
  ): Promise<IApartmentSimpleDTO[] | null> {
    try {
      const apartmentRepo =
        AppDataSource.getInstance().getRepository(ApartmentModel);

      const query = prefix.trim();

      // Check if the query is a valid number to search by ID
      const isNumeric = /^\d+$/.test(query);

      // Initialize the array for OR logic
      let whereCondition: FindOptionsWhere<ApartmentModel>[] = [
        { title: Like(`%${query}%`) },
        { address: Like(`%${query}%`) },
        { description: Like(`%${query}%`) },

        // Optional: Search by Landlord Name via relation
        { landlord: { user: { Name: Like(`%${query}%`) } } },
      ];

      // If the query is a number, add the ID search to the array
      if (isNumeric) {
        whereCondition.push({ apartmentId: Number(query) });
      }

      const apartments = await apartmentRepo.find({
        where: whereCondition,

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
        },

        relations: {
          landlord: {
            user: true,
          },
          photos: true,
        },
      });

      if (!apartments || apartments.length === 0) {
        return [];
      }

      return apartments.map((orm) => ApartmentMapper.toResponsesSimple(orm));
    } catch (error: any) {
      console.error("Error searching apartment:", error);
      throw new Error(`Unable to search apartments: ${error.message}`);
    }
  }

  public async findApartmentById(
    id: number
  ): Promise<ApartmentAggregateRoot | null> {
    try {
      const apartment = await AppDataSource.getInstance()
        .getRepository(ApartmentModel)
        .findOne({
          where: { apartmentId: id },
          relations: {
            landlord: { user: true },
            documents: true,
            location: true,
            photos: true,
          },
        });

      return apartment ? ApartmentMapper.toEntity(apartment) : null;
    } catch (error) {
      console.error("Error finding landlord by ID:", error);
      throw new Error("Error retrieving landlord data");
    }
  }

  public async findApartmentDetailsById(
    id: number
  ): Promise<IApartmentDTO | null> {
    try {
      const apartment = await AppDataSource.getInstance()
        .getRepository(ApartmentModel)
        .findOne({
          where: { apartmentId: id },
          relations: {
            landlord: { user: true },
            documents: true,
            location: true,
            photos: true,
          },
        });

      return apartment ? ApartmentMapper.toResponsesDetail(apartment) : null;
    } catch (error) {
      console.error("Error finding landlord by ID:", error);
      throw new Error("Error retrieving landlord data");
    }
  }
}

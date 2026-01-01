import { FindOptionsWhere, Like } from "typeorm";

import { IReadApartmentRepo } from "../../../Domain/Modules/Housing/Repositories/Read/ReadApartmentRepo.repositoreis";
import { AppDataSource } from "../../Database/orm/TypeOrm/data-source";
import { ApartmentModel } from "../../Database/orm/TypeOrm/entity/Apartment.entity";
import { ApartmentMapper } from "../mapper/apartment.mapper";
import { ApartmentAggregateRoot } from "../../../Domain/Modules/Housing/AgregateRoot/apartmentEntity.entity";
import {
  IApartmentSimpleDTO,
  IApartmentDTO,
} from "../../../Application/DTO/admin/ApartmentDTo.dto";

export class ReadApartmentRepositories implements IReadApartmentRepo {
  public async findAllApartmentForLandlord(
    userId: string
  ): Promise<IApartmentSimpleDTO[] | null> {
    try {
      const apartmentRepo =
        AppDataSource.getInstance().getRepository(ApartmentModel);

      const apartments = await apartmentRepo.find({
        // 1. SELECT: Here you pick the Columns
        where: {
          landlordId: userId,
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

      return apartments.map((apt) => ApartmentMapper.toResponsesSimple(apt));
    } catch (error: any) {
      console.error("Error finding apartments:", error);
      throw new Error("Unable to retrieve apartments.");
    }
  }

  public async findApartmentByQueryForLandlord(
    prefix: string,
    userId: string
  ): Promise<IApartmentSimpleDTO[] | null> {
    try {
      const apartmentRepo =
        AppDataSource.getInstance().getRepository(ApartmentModel);

      const query = prefix.trim();

      const searchFields: FindOptionsWhere<ApartmentModel>[] = [
        { title: Like(`%${query}%`) },
        { address: Like(`%${query}%`) },
        { description: Like(`%${query}%`) },
        { apartmentId: query },
      ];

      const whereCondition = searchFields.map((condition) => ({
        ...condition,
        landlord: { userId: userId }, // 👈 Restricts results to this user
      }));

      if (!query) {
        // If query is empty, just return all apartments for this landlord
        whereCondition.length = 0; // Clear search fields
        whereCondition.push({ landlord: { userId: userId } });
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

  findApartmentForLandlordById(
    id: string,
    userId: string
  ): Promise<ApartmentAggregateRoot | null> {
    throw new Error("Method not implemented.");
  }
  findApartmentDetailsByIdForLandlord(
    id: string,
    userId: string
  ): Promise<IApartmentDTO | null> {
    throw new Error("Method not implemented.");
  }
  public async findAllApartment(
    userId: string
  ): Promise<IApartmentSimpleDTO[] | null> {
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

  public async findApartmentByQuery(
    prefix: string
  ): Promise<IApartmentSimpleDTO[] | null> {
    try {
      const apartmentRepo =
        AppDataSource.getInstance().getRepository(ApartmentModel);

      const query = prefix.trim();

      // Initialize the array for OR logic
      let whereCondition: FindOptionsWhere<ApartmentModel>[] = [
        { title: Like(`%${query}%`) },
        { address: Like(`%${query}%`) },
        { description: Like(`%${query}%`) },

        // Optional: Search by Landlord Name via relation
        { landlord: { user: { Name: Like(`%${query}%`) } } },
        { apartmentId: Like(`%${query}%`) },
      ];

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
    id: string
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
    id: string
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

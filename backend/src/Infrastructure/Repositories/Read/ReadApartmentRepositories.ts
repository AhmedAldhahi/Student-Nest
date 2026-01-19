import { FindOptionsWhere, In, Like, SelectQueryBuilder } from "typeorm";
import { AppDataSource } from "../../Database/TypeOrm/data-source";
import { ApartmentModel } from "../../Database/TypeOrm/entity/Apartment.entity";
import { ApartmentMapper } from "../mapper/apartment.mapper";
import { ApartmentAggregateRoot } from "../../../Domain/BoundedContexts/Housing/AgregateRoot/apartmentEntity.entity";
import { IReadApartmentRepo } from "../../../Domain/BoundedContexts/Housing/Repositories/ReadApartmentRepo.repositoreis";
import { IApartmentDTO } from "../../../Domain/BoundedContexts/Housing/Representations/IApartmentDto";
import { IApartmentSimpleDTO } from "../../../Domain/BoundedContexts/Housing/Representations/IApartmentSimpleDto";
import { IApartmentForGuestDTO } from "../../../Domain/BoundedContexts/Housing/Representations/IApartmentForGuestDTO";
import { FilterOptionType } from "../../../Domain/BoundedContexts/Housing/Types/ApartmentFilterType.type";

export class ReadApartmentRepositories implements IReadApartmentRepo {
  public async filterApartment(
    type: FilterOptionType,
  ): Promise<IApartmentSimpleDTO[] | null> {
    const queryBuilder: SelectQueryBuilder<ApartmentModel> =
      AppDataSource.getInstance()
        .getRepository(ApartmentModel)
        .createQueryBuilder("apartment")
        .leftJoinAndSelect("apartment.location", "location")
        .leftJoinAndSelect("apartment.landlord", "landlord")
        .leftJoinAndSelect("landlord.user", "user")
        .leftJoinAndSelect("apartment.photos", "photos");

    queryBuilder.andWhere("apartment.isVisible = :visible", { visible: true });
    queryBuilder.andWhere("apartment.isVerified = :verified", {
      verified: true,
    });

    if (type.University) {
      queryBuilder.andWhere("apartment.universityName = :uName", {
        uName: type.University,
      });
    }

    if (type.isJoint !== undefined) {
      queryBuilder.andWhere("apartment.isJoint = :isJoint", {
        isJoint: type.isJoint,
      });
    }

    if (type.minPrice) {
      queryBuilder.andWhere("apartment.price >= :minPrice", {
        minPrice: Number(type.minPrice),
      });
    }
    if (type.maxPrice) {
      queryBuilder.andWhere("apartment.price <= :maxPrice", {
        maxPrice: Number(type.maxPrice),
      });
    }

    if (type.minAge) {
      queryBuilder.andWhere("apartment.allowedAge >= :minAge", {
        minAge: Number(type.minAge),
      });
    }
    if (type.maxAge) {
      queryBuilder.andWhere("apartment.allowedAge <= :maxAge", {
        maxAge: Number(type.maxAge),
      });
    }

    queryBuilder.orderBy("apartment.createAt", "DESC");

    try {
      const apartments = await queryBuilder.getMany();

      if (!apartments || apartments.length === 0) {
        return [];
      }

      return apartments.map((apt) => ApartmentMapper.toResponsesSimple(apt));
    } catch (error) {
      console.error("Database Error: Failed to filter apartments", error);
      throw new Error("Could not fetch apartments from database");
    }
  }

  public async FindAllApartmentThatBeenVerified(): Promise<
    IApartmentSimpleDTO[] | null
  > {
    try {
      const apartmentRepo =
        AppDataSource.getInstance().getRepository(ApartmentModel);

      const apartments = await apartmentRepo.find({
        where: {
          isVerified: true,
          isVisible: true,
        },
        select: {
          apartmentId: true,
          isVisible: true,
          title: true,
          description: true,
          address: true,
          isJoin: true,
          createAt: true,
          updateAt: true,
          price: true,
          isVerified: true,
          numberOfBed: true,
          numberOfRoom: true,
          landlordId: true,
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
          location: true,
          documents: true,
        },
      });

      if (!apartments || apartments.length === 0) {
        return [];
      }

      return apartments.map((apt) => ApartmentMapper.toResponsesSimple(apt));
    } catch (error: any) {
      console.error("Error finding verified apartments:", error);
      throw new Error("Unable to retrieve verified apartments.");
    }
  }

  public async findAllApartmentBasedArray(
    ids: string[],
    userId: string,
  ): Promise<IApartmentSimpleDTO[] | null> {
    try {
      if (!ids || ids.length === 0) {
        return [];
      }
      const apartmentModels = await AppDataSource.getInstance()
        .getRepository(ApartmentModel)
        .find({
          where: {
            apartmentId: In(ids),
            landlord: { userId: userId },
          },
          relations: {
            photos: true,
            landlord: { user: true },
            location: true,
          },
        });

      if (!apartmentModels || apartmentModels.length === 0) {
        return [];
      }

      return apartmentModels.map((model) =>
        ApartmentMapper.toResponsesSimple(model),
      );
    } catch (error) {
      console.error("Failed to find apartments by ID array:", error);
      throw error;
    }
  }

  public async SearchForApartmentBasedArray(
    ids: string[],
    queries: string,
  ): Promise<ApartmentAggregateRoot[] | null> {
    throw new Error("Method not implemented.");
  }

  public async findApartmentByIdForLandlord(
    id: string,
    userId: string,
  ): Promise<ApartmentAggregateRoot | null> {
    try {
      const apartment = await AppDataSource.getInstance()
        .getRepository(ApartmentModel)
        .findOne({
          where: { apartmentId: id, landlordId: userId },
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
  public async findAllApartmentForLandlord(
    userId: string,
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
          isVisible: true,
          title: true,
          description: true,
          address: true,
          isJoin: true,
          createAt: true,
          updateAt: true,
          price: true,
          isVerified: true,
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
          location: true,
          documents: true,
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
    userId: string,
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
          isVisible: true,
          title: true,
          description: true,
          address: true,
          isJoin: true,
          createAt: true,
          updateAt: true,
          price: true,
          isVerified: true,
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
          location: true,
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

  public async findApartmentForLandlordById(
    id: string,
    userId: string,
  ): Promise<ApartmentAggregateRoot | null> {
    try {
      const apartment = await AppDataSource.getInstance()
        .getRepository(ApartmentModel)
        .findOne({
          where: { apartmentId: id, landlordId: userId },
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

  public async findApartmentDetailsByIdForLandlord(
    id: string,
    userId: string,
  ): Promise<IApartmentDTO | null> {
    console.log(`id ${id} and user id ${userId}`);
    try {
      const apartment = await AppDataSource.getInstance()
        .getRepository(ApartmentModel)
        .findOne({
          where: { apartmentId: id, landlord: { userId: userId } },
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
  public async findAllApartment(
    userId: string,
  ): Promise<IApartmentSimpleDTO[] | null> {
    try {
      const apartmentRepo =
        AppDataSource.getInstance().getRepository(ApartmentModel);

      const apartments = await apartmentRepo.find({
        // 1. SELECT: Here you pick the Columns
        select: {
          apartmentId: true,
          isVisible: true,
          title: true,
          description: true,
          address: true,
          isJoin: true,
          createAt: true,
          updateAt: true,
          price: true,
          isVerified: true,
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
          location: true,
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
    prefix: string,
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
          isVisible: true,
          title: true,
          description: true,
          address: true,
          isJoin: true,
          createAt: true,
          updateAt: true,
          price: true,
          isVerified: true,
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
          location: true,
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
    id: string,
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
    id: string,
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

  public async findApartmentDetailsForGuestById(
    id: string,
  ): Promise<IApartmentForGuestDTO | null> {
    // 1. Fetch only public data
    const apartment = await AppDataSource.getInstance()
      .getRepository(ApartmentModel)
      .findOne({
        where: {
          apartmentId: id,
          isVisible: true,
          isVerified: true,
        },
        relations: {
          landlord: { user: true },
          location: true,
          photos: true,
        },
      });

    if (!apartment) return null;

    // 2. Map to DTO
    // Your mapper should handle "undefined" documents gracefully (e.g., return empty array)
    return ApartmentMapper.toResponsesDetailForGuest(apartment);
  }
}

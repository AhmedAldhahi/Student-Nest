import { LandlordAggregateRoot } from "../../../Domain/AggregatesRoot/landloardEntity.entity";
import { IReadLandlordRepositories } from "../../../Domain/Repositories/Read/ReadLandlordRepositories.repositoreies";
import { LandlordModel } from "../../Database/orm/TypeOrm/entity/Landloard.entity";
import { LandlordMapper } from "../mapper/landloard.mapper";
import { AppDataSource } from "../../Database/orm/TypeOrm/data-source";
import { LandlordResponseDTO } from "../../../Application/Dtos/profile/LandlordResponeDTO";
import { Like } from "typeorm";

export class ReadLandlordRepositories implements IReadLandlordRepositories {
  public async findLandlordById(
    userId: string
  ): Promise<LandlordAggregateRoot | null> {
    try {
      const landlord = await AppDataSource.getInstance()
        .getRepository(LandlordModel)
        .findOne({
          where: { userId },
          relations: ["user"],
        });

      return landlord ? LandlordMapper.toEntity(landlord) : null;
    } catch (error) {
      console.error("Error finding landlord by ID:", error);
      throw new Error("Error retrieving landlord data");
    }
  }

  public async findAllLandlord(): Promise<LandlordResponseDTO[] | null> {
    try {
      const landlordModels = await AppDataSource.getInstance()
        .getRepository(LandlordModel)
        .find({
          select: {
            CliQAccount: true,
            LandlordGovId: true,
            Verified: true,
            document: true,
            user: {
              userId: true,
              Email: true,
              Name: true,
              PhoneNumber: true,
              DateOfBirth: true,
              Address: true,
              Role: true,
              Photo: true,
              isActive: true,
              emailVerfied: true,
              createAt: true,
            },
          },
          relations: {
            user: true,
          },
        });

      if (!landlordModels || landlordModels.length === 0) return [];

      return landlordModels.map((orm) => {
        return LandlordMapper.toResponse(orm);
      });
    } catch (err: any) {
      console.error("fail to get all landlord", err);
      throw err;
    }
  }

  public async searchByEmail(
    prefix: string
  ): Promise<LandlordResponseDTO[] | null> {
    try {
      // Query landlords and include the related `user` entity to search by `Email`
      const landlordsModel = await AppDataSource.getInstance()
        .getRepository(LandlordModel)
        .find({
          where: {
            user: {
              Email: Like(`${prefix}%`), // Now we're querying the related `user` entity's `Email` field
            },
          },
          select: {
            CliQAccount: true,
            LandlordGovId: true,
            Verified: true,
            document: true,
            user: {
              userId: true,
              Email: true,
              Name: true,
              PhoneNumber: true,
              DateOfBirth: true,
              Address: true,
              Role: true,
              Photo: true,
              isActive: true,
              emailVerfied: true,
              createAt: true,
            },
          },
          relations: {
            user: true,
          },
        });

      if (!landlordsModel || landlordsModel.length === 0) return [];

      return landlordsModel.map((orm) => {
        return LandlordMapper.toResponse(orm);
      });
    } catch (err: any) {
      console.error("Failed to search landlords by email", err);
      throw new Error("Error while searching landlords by email");
    }
  }
}

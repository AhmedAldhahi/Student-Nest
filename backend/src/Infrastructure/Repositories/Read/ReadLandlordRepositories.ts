import { FindOptionsWhere, Like } from "typeorm";
import { LandlordAggregateRoot } from "../../../Domain/BoundedContexts/IdentityAndAccess/Aggregates/landloardAggregateRoot.entity";
import { IReadLandlordRepositories } from "../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadLandlordRepositories.repositoreies";
import { AppDataSource } from "../../Database/TypeOrm/data-source";
import { LandlordModel } from "../../Database/TypeOrm/entity/Landlord.entity";
import { LandlordMapper } from "../mapper/landlord.mapper";
import { LandlordResponseDTO } from "../../../Domain/BoundedContexts/IdentityAndAccess/Representations/LandlordResponseDTO";

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

  public async searchByQuery(
    prefix: string
  ): Promise<LandlordResponseDTO[] | null> {
    try {
      const query = prefix.trim();

      const phoneSearch = query.startsWith("0") ? query.substring(1) : query;

      const whereCondition: FindOptionsWhere<LandlordModel>[] = [
        { user: { Name: Like(`%${query}%`) } },
        { user: { Email: Like(`%${query}%`) } },
        { user: { userId: Like(`%${query}%`) } }, // UUID search

        // --- Phone Number (Check both formats) ---
        { user: { PhoneNumber: Like(`%${query}%`) } }, // Matches exact input
        { user: { PhoneNumber: Like(`%${phoneSearch}%`) } }, // Matches without leading zero

        // --- Landlord Specific Data ---
        { CliQAccount: Like(`%${query}%`) }, // Now works for Numbers AND Aliases
        { LandlordGovId: Like(`${query}%`) }, // Gov ID
      ];

      const landlordsModel = await AppDataSource.getInstance()
        .getRepository(LandlordModel)
        .find({
          where: whereCondition,
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

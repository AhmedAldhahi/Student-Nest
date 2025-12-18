import { LandlordAggregateRoot } from "../../../Domain/AggregatesRoot/landloardEntity.entity";
import { IReadLandlordRepositories } from "../../../Domain/Repositories/Read/ReadLandlordRepositories.repositoreies";
import { LandlordModel } from "../../Database/orm/TypeOrm/entity/Landloard.entity";
import { LandlordMapper } from "../landloard.mapper";
import { AppDataSource } from "../../Database/orm/TypeOrm/data-source";

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
}

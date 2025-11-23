import { EntityManager } from "typeorm";
import { ILandlordRepository } from "../../../Core/repositories/LandlordRepositories.repositories";
import { LandlordModel } from "../orm/TypeOrm/entity/Landloard.entity";
import { UserRepository } from "./user.repositories";
import { LandlordEntity } from "../../../Core/entites/landloardEntity.entity";
import { LandlordMapper } from "./landloard.mapper";
import { UserMapper } from "./user.mapper";

export class LandlordRepository implements ILandlordRepository {
  
  private manager: EntityManager;
  private userRepo: UserRepository;

  constructor(manager: EntityManager) {
    this.manager = manager;
    this.userRepo = new UserRepository(manager);
  }

  async createNewLandlord(landlord: LandlordEntity): Promise<void> {
    try {
      const userEntity = await landlord.getUser();
      
      // 1. Save User (Uses Transaction Manager)
      await this.userRepo.addNewUser(userEntity);
      
      const model = LandlordMapper.toOrm(landlord);
      model.user = UserMapper.toOrm(userEntity);


      await this.manager.save(LandlordModel, model);
      
    } catch (err: any) {
      console.error("failed to create landlord !!", err);
      throw err;
    }
  }

  async updateLandlord(user: LandlordEntity): Promise<void> {
    try {
      const userEntity = user.getUser();
      await this.userRepo.updateUser(userEntity);
      const landlordModel = LandlordMapper.toOrm(user);
      landlordModel.user = UserMapper.toOrm(userEntity);

      await this.manager.update(LandlordModel, { userId: landlordModel.userId }, landlordModel);
    } catch (err: any) {
      console.error("failed to update landlord !!", err);
      throw err;
    }
  }
}
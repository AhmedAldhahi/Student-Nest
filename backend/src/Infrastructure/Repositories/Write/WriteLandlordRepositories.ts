import { EntityManager } from "typeorm";
import { LandlordAggregateRoot } from "../../../Domain/Modules/Housing/AgregateRoot/landloardEntity.entity";
import { WriteUserRepositories } from "./WriteUserRepositories";
import { LandlordMapper } from "../mapper/landloard.mapper";
import { LandlordModel } from "../../Database/orm/TypeOrm/entity/Landloard.entity";
import { IWriteLandlordRepositories } from "../../../Domain/Modules/Housing/Repositories/Write/WriteLandlordRepositories.repositories";

export class WriteLandlordRepositories implements IWriteLandlordRepositories {
  private manager: EntityManager;
  private writeUserRepo: WriteUserRepositories;

  constructor(manager: EntityManager) {
    this.manager = manager;
    this.writeUserRepo = new WriteUserRepositories(manager);
  }

  public async addNewLandlord(landlord: LandlordAggregateRoot): Promise<void> {
    const model = LandlordMapper.toOrm(landlord);
    await this.manager.save(LandlordModel, model);
  }
  public async updateLandlord(landlord: LandlordAggregateRoot): Promise<void> {
    const model = LandlordMapper.toOrm(landlord);
    await this.manager.save(LandlordModel, model);
  }
}

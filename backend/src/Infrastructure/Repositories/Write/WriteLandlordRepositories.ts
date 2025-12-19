import { EntityManager } from "typeorm";
import { LandlordAggregateRoot } from "../../../Domain/AggregatesRoot/landloardEntity.entity";
import { IWriteLandlordRepositories } from "../../../Domain/Repositories/Write/WriteLandlordRepositories.repositories";
import { WriteUserRepositories } from "./WriteUserRepositories";
import { LandlordMapper } from "../mapper/landloard.mapper";
import { LandlordModel } from "../../Database/orm/TypeOrm/entity/Landloard.entity";

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

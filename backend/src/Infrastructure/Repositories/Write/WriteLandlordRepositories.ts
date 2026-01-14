import { EntityManager } from "typeorm";
import { LandlordAggregateRoot } from "../../../Domain/BoundedContexts/IdentityAndAccess/Aggregates/landloardAggregateRoot.entity";
import { WriteUserRepositories } from "./WriteUserRepositories";
import { LandlordMapper } from "../mapper/landlord.mapper";
import { LandlordModel } from "../../Database/TypeOrm/entity/Landlord.entity";
import { IWriteLandlordRepositories } from "../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/WriteLandlordRepositories.repositories";

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

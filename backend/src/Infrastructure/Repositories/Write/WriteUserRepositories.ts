import { EntityManager } from "typeorm";
import { UserEntity } from "../../../Domain/Entities/userEntity.entity";
import { IWriteUserRepositories } from "../../../Domain/Repositories/Write/WriteUserRepositories.repositories";
import { UserModel } from "../../Database/orm/TypeOrm/entity/User.entity";
import { UserMapper } from "../mapper/user.mapper";

export class WriteUserRepositories implements IWriteUserRepositories {
  constructor(private readonly manager: EntityManager) {}
  public async addNewUser(user: UserEntity): Promise<void> {
    const model = UserMapper.toOrm(user);
    await this.manager.save(UserModel, model);
  }

  public async updateUser(user: UserEntity): Promise<void> { 
    const model = UserMapper.toOrm(user);
    await this.manager.save(UserModel,model);
  }

  public async deleteUser(id: string): Promise<void> {
    await this.manager.delete(UserModel, { userId: id });
  }
}

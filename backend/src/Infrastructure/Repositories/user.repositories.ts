import { UserEntity } from "../../Domain/Entites/userEntity.entity";
import { UserMapper } from "./user.mapper";
import { UserModel } from "../Database/orm/TypeOrm/entity/User.entity";
import { EntityManager } from "typeorm";
import { IUserRepository } from "../../Domain/Repositories/UserRepositories.repositories";

export class UserRepository implements IUserRepository {
  constructor(private readonly manager: EntityManager) { }

  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.manager.findOne(UserModel, { where: { userId: id } });
    return user ? UserMapper.toEntity(user) : null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.manager.findOne(UserModel, { where: { Email: email } });
    return user ? UserMapper.toEntity(user) : null;
  }

  async addNewUser(user: UserEntity): Promise<void> {
    const model = UserMapper.toOrm(user);
    await this.manager.save(UserModel, model);
  }

  async updateUser(user: UserEntity): Promise<void> {
    const model = UserMapper.toOrm(user);
    await this.manager.update(UserModel, { userId: model.userId }, model);
  }

  async deleteUser(id: string): Promise<void> {
    await this.manager.delete(UserModel, { userId: id });
  }
}

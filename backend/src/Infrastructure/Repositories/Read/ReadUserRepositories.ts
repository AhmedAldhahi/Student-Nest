import { UserEntity } from "../../../Domain/Entities/userEntity.entity";
import { IReadUserRepositories } from "../../../Domain/Repositories/Read/ReadUserRepositories.repositories";
import { UserMapper } from "../mapper/user.mapper";
import { UserModel } from "../../Database/orm/TypeOrm/entity/User.entity";
import { AppDataSource } from "../../Database/orm/TypeOrm/data-source";

export class ReadUserRepositories implements IReadUserRepositories {
  public async findById(id: string): Promise<UserEntity | null> {
    const user = await AppDataSource.getInstance()
      .getRepository(UserModel)
      .findOne({ where: { userId: id } });

    return user ? UserMapper.toEntity(user) : null;
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await AppDataSource.getInstance()
      .getRepository(UserModel)
      .findOne({ where: { Email: email } });

    return user ? UserMapper.toEntity(user) : null;
  }
}

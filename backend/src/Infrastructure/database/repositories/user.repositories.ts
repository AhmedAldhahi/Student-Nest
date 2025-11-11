import { Repository } from "typeorm";
// We no longer import AppDataSource here
import { UserMapper } from "./user.mapper";
import { User as DomainUser } from "../../../Core/entites/user.entity";
import { User as TypeOrmUser } from "../orm/TypeOrm/entity/User.entity";
import { IUserRepository } from "../../../Core/repositories/UserRepoitories.repositories";
/**
 * This is the corrected repository.
 * It is "transaction-aware" because it receives its
 * repository/manager from the constructor.
 */
export class UserRepository implements IUserRepository {
  /**
   * THIS IS THE FIX.
   * We are no longer creating the repository. We are *receiving* it.
   * This is what fixes the "Expected 0 arguments, but got 1" error.
   */
  constructor(private readonly ormRepository: Repository<TypeOrmUser>) {}

  /**
   * Finds a user by their email.
   */
  async findByEmail(email: string): Promise<DomainUser | null> {
    const dbUser = await this.ormRepository.findOne({
      where: { Email: email },
    });

    if (!dbUser) {
      return null;
    }

    return UserMapper.toDomain(dbUser);
  }

  /**
   * Finds a user by their ID.
   */
  async findById(id: string): Promise<DomainUser | null> {
    // Make sure your IUserRepository interface uses (id: string)
    const dbUser = await this.ormRepository.findOneBy({
      userId: id,
    });

    if (!dbUser) {
      return null;
    }

    return UserMapper.toDomain(dbUser);
  }

  /**
   * Saves a user (creates or updates).
   */
  async save(user: DomainUser): Promise<void> {
    const dbUser = UserMapper.toPersistence(user);
    await this.ormRepository.save(dbUser);
  }
}

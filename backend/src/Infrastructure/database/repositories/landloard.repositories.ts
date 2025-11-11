import { Repository } from "typeorm";
// We no longer import AppDataSource here
import { LandlordMapper } from "./landloard.mapper";
import { Landlord as TypeOrmLandloard } from "../orm/TypeOrm/entity/Landloard.entity";
import { User as TypeOrmUser } from "../orm/TypeOrm/entity/User.entity";
import { Landloard as DomainLandlord } from "../../../Core/entites/landloard.entity";
import { ILandloardRepository } from "../../../Core/repositories/LandloardRepositories.repositoris";

export class LandloardRepository implements ILandloardRepository {
  /**
   * THIS IS THE FIX.
   * This class also needs two repositories.
   */
  constructor(
    private readonly landloardRepository: Repository<TypeOrmLandloard>,
    private readonly userRepository: Repository<TypeOrmUser>
  ) {}

  async findByEmail(email: string): Promise<DomainLandlord | null> {
    const user = await this.userRepository.findOne({
      where: { Email: email },
    });

    if (!user) {
      return null;
    }

    const dbLandlord = await this.landloardRepository.findOne({
      where: { user: { userId: user.userId } },
      relations: ["user"],
    });

    if (!dbLandlord) {
      return null;
    }

    return LandlordMapper.toDomain(dbLandlord);
  }

  async findById(id: string): Promise<DomainLandlord | null> {
    // Make sure your ILandloardRepository interface uses (id: string)
    const dbLandlord = await this.landloardRepository.findOne({
      where: { user: { userId: id } },
      relations: ["user"],
    });

    if (!dbLandlord) {
      return null;
    }

    return LandlordMapper.toDomain(dbLandlord);
  }

  async save(landlord: DomainLandlord): Promise<void> {
    const dbLandlord = LandlordMapper.toPersistence(landlord);
    await this.landloardRepository.save(dbLandlord);
  }
}

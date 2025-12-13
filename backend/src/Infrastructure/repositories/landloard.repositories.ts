import { DataSource, EntityManager } from "typeorm";
import {
  ILandlordRepository,
  LandlordResponseDTO,
} from "../../Core/repositories/LandlordRepositories.repositories";
import { LandlordModel } from "../database/orm/TypeOrm/entity/Landloard.entity";
import { UserRepository } from "./user.repositories";
import { LandlordEntity } from "../../Core/entites/landloardEntity.entity";
import { LandlordMapper } from "./landloard.mapper";
import { UserMapper } from "./user.mapper";
import { UserEntity } from "../../Core/entites/userEntity.entity";
import { UserModel } from "../database/orm/TypeOrm/entity/User.entity";
import { toUpperCase } from "zod";

export class LandlordRepository implements ILandlordRepository {
  private manager: EntityManager;
  private userRepo: UserRepository;

  constructor(manager: EntityManager) {
    this.manager = manager;
    this.userRepo = new UserRepository(manager);
  }

  public async findLandlordById(
    userId: string
  ): Promise<LandlordEntity | null> {
    const user = await this.manager.findOne(LandlordModel, {
      where: { userId: userId },
      relations: ["user"],
    });
    return user ? LandlordMapper.toEntity(user) : null;
  }

  public async createNewLandlord(landlord: LandlordEntity): Promise<void> {
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

      await this.manager.update(
        LandlordModel,
        { userId: landlordModel.userId },
        landlordModel
      );
    } catch (err: any) {
      console.error("failed to update landlord !!", err);
      throw err;
    }
  }

  public async findAllLandlord(): Promise<LandlordResponseDTO[] | null> {
    try {
      const landlordModels = await this.manager
        .getRepository(LandlordModel)
        .find({
          select: {
            CliQAccount: true,
            LandlordGovId: true,
            Verified: true,
            document: true,
            user: {
              userId: true,
              Email: true,
              Name: true,
              PhoneNumber: true,
              DateOfBirth: true,
              Address: true,
              Role: true,
              Photo: true,
              isActive: true,
              emailVerfied: true,
              createAt: true,
            },
          },
          relations: {
            user: true,
          },
        });

      if (!landlordModels || landlordModels.length === 0) 
        throw new Error ("no data found !!");

      return landlordModels.map((orm) => {
        const landlordEntity = LandlordMapper.toEntity(orm);

        const userResponse = UserMapper.toUserResponse(orm.user);

        return {
          user: userResponse,
          cliQAccount: landlordEntity.getCliQAccount(),
          landlordGovId: landlordEntity.getGovId(),
          document: landlordEntity.getVerificationFile(),
          verifiedLandlord: landlordEntity.getLandlordVerified(),
        };
      });
    } catch (err: any) {
      console.error("fail to get all landlord", err);
      throw err;
    }
  }
}

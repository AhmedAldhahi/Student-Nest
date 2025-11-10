import { IUserRepository } from "../../../Core/repositories/UserRepoitories.repositories";
import { IStudentRepository } from "../../../Core/repositories/StudentRepoitories.repoitories";
import { ILandloardRepository } from "../../../Core/repositories/LandloardRepositories.repositoris";
import { IUnitOfWorkRepository } from "../../../Core/repositories/UnitOfWorkRepository.repository";

// TypeORM and local classes
import { AppDataSource } from "../orm/TypeOrm/data-source";
import { QueryRunner } from "typeorm";
import { UserRepository } from "./user.repositories";
import { StudentRepository } from "./student.repositories";
import { LandloardRepository } from "./landloard.repositories";

// Import TypeORM entities
import { User as TypeOrmUser } from "../orm/TypeOrm/entity/User.entity";
import { Student as TypeOrmStudent } from "../orm/TypeOrm/entity/Student.entity";
import { Landlord as TypeOrmLandloard } from "../orm/TypeOrm/entity/Landloard.entity";

export class UnitOfWorkRepositories implements IUnitOfWorkRepository {
  userRepotories: IUserRepository;
  StudentRepostoies: IStudentRepository;
  LandloardReposotries: ILandloardRepository;

  private queryRunner: QueryRunner | null;

  constructor() {
    this.queryRunner = null;
  }

  async startTransaction(): Promise<void> {
    this.queryRunner = AppDataSource.createQueryRunner();
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();

    // --- THIS IS THE CORRECTED SECTION ---

    // 1. Get transaction-aware entity managers
    const userManager = this.queryRunner.manager.getRepository(TypeOrmUser);
    const studentManager =
      this.queryRunner.manager.getRepository(TypeOrmStudent);
    const landlordManager =
      this.queryRunner.manager.getRepository(TypeOrmLandloard);

    // 2. Create new repository instances, passing the managers

    // UserRepository constructor takes 1 argument
    this.userRepotories = new UserRepository(userManager);

    // StudentRepository constructor takes 2 arguments
    this.StudentRepostoies = new StudentRepository(studentManager, userManager);

    // LandloardRepository constructor takes 2 arguments
    this.LandloardReposotries = new LandloardRepository(
      landlordManager,
      userManager
    );
  }

  async commit(): Promise<void> {
    if (!this.queryRunner) {
      throw new Error(
        "Transaction has not been started. Call startTransaction() first."
      );
    }
    try {
      await this.queryRunner.commitTransaction();
    } finally {
      await this.queryRunner.release();
      this.queryRunner = null;
    }
  }

  async rollBack(): Promise<void> {
    if (!this.queryRunner) {
      throw new Error("Transaction has not been started.");
    }
    try {
      await this.queryRunner.rollbackTransaction();
    } finally {
      await this.queryRunner.release();
      this.queryRunner = null;
    }
  }
}

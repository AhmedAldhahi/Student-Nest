import { QueryRunner } from "typeorm";
import { IUnitOfWork } from "../../../Core/repositories/UnitOfWorkRepositories.repositories";
import { UserRepository } from "./user.repositories";
import { LandlordRepository } from "./landloard.repositories";
import { AppDataSource } from "../orm/TypeOrm/data-source";
import { IStudentRepository } from "../../../Core/repositories/StudentRepositories.repositories";
import { StudentRepository } from "./student.repositories";
export class UnitOfWork implements IUnitOfWork {
  private queryRunner: QueryRunner | null = null;

  public userRepo!: UserRepository;
  public landlordRepo!: LandlordRepository;
  public studentRepo!: IStudentRepository;

  async startTransaction(): Promise<void> {
    this.queryRunner = AppDataSource.createQueryRunner();
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();

    const manager = this.queryRunner.manager;

    // Inject the TRANSACTIONAL manager into repositories
    this.userRepo = new UserRepository(manager);
    this.landlordRepo = new LandlordRepository(manager);
    this.studentRepo = new StudentRepository(manager);
  }

  async commitTransaction(): Promise<void> {
    if (!this.queryRunner) return;

    try {
      await this.queryRunner.commitTransaction();
    } catch (err) {
      await this.rollbackTransaction();
      throw err;
    } finally {
      // ✅ FIX 1: You MUST release the connection after commit
      await this.releaseTransaction();
    }
  }

  async rollbackTransaction(): Promise<void> {
    if (!this.queryRunner) return;

    try {
      if (this.queryRunner.isTransactionActive) {
        await this.queryRunner.rollbackTransaction();
      }
    } finally {
      // This ensures release happens even after rollback
      await this.releaseTransaction();
    }
  }

  async releaseTransaction(): Promise<void> {
    if (this.queryRunner && !this.queryRunner.isReleased) {
      await this.queryRunner.release();
    }
    this.queryRunner = null;
  }
}

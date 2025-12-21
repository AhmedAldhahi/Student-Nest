import { QueryRunner } from "typeorm";
import { IUnitOfWork } from "../../Domain/Repositories/UnitOfWorkRepositories.repositories";
import { AppDataSource } from "../Database/orm/TypeOrm/data-source";
import { IWriteUserRepositories } from "../../Domain/Repositories/Write/WriteUserRepositories.repositories";
import { WriteUserRepositories } from "./Write/WriteUserRepositories";
import { IWriteStudentRepositories } from "../../Domain/Repositories/Write/WriteStudentRepositories.repositories";
import { WriteStudentRepositories } from "./Write/WriteStudentRepositories";
import { IWriteLandlordRepositories } from "../../Domain/Repositories/Write/WriteLandlordRepositories.repositories";
import { WriteLandlordRepositories } from "./Write/WriteLandlordRepositories";

export class UnitOfWork implements IUnitOfWork {
  //TESt

  private queryRunner: QueryRunner | null = null;

  // CQRS
  public writeUserRepo!: IWriteUserRepositories;
  public writeStudentRepo!: IWriteStudentRepositories;
  public writeLandlordRepo!: IWriteLandlordRepositories;

  async startTransaction(): Promise<void> {
    this.queryRunner = AppDataSource.getInstance().createQueryRunner();
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();

    const manager = this.queryRunner.manager;

    // CQRS
    this.writeUserRepo = new WriteUserRepositories(manager);
    this.writeStudentRepo = new WriteStudentRepositories(manager);
    this.writeLandlordRepo = new WriteLandlordRepositories(manager);
  }

  async commitTransaction(): Promise<void> {
    if (!this.queryRunner) return;

    try {
      await this.queryRunner.commitTransaction();
    } catch (err) {
      await this.rollbackTransaction();
      throw err;
    } finally {
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

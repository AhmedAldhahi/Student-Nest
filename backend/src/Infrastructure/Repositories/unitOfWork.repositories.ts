import { QueryRunner } from "typeorm";
import { IUnitOfWork } from "../../Domain/Shared/Repositories/UnitOfWorkRepositories.repositories";
import { AppDataSource } from "../Database/orm/TypeOrm/data-source";
import { IWriteUserRepositories } from "../../Domain/Modules/Identity/Repositories/WriteUserRepositories.repositories";
import { WriteUserRepositories } from "./Write/WriteUserRepositories";
import { WriteStudentRepositories } from "./Write/WriteStudentRepositories";
import { WriteLandlordRepositories } from "./Write/WriteLandlordRepositories";
import { IWriteNotificationRepo } from "../../Domain/Shared/Repositories/IWriteNotficationRepositories.repositores";
import { WriteNotificationRepositories } from "./Write/WriteNotificationRepositories";
import { IWriteApartmentRepo } from "../../Domain/Modules/Housing/Repositories/Write/IWriteApartmentRepositories.repositories";
import { WriteApartmentsRepositories } from "./Write/WriteApartmentRepositories";
import { IWriteApartmentDocumentRepo } from "../../Domain/Modules/Housing/Repositories/Write/IWriteApartmentDocumentRepositoires.repositories";
import { WriteApartmentDocumentRepositories } from "./Write/WriteApartmentDocumentRepositories";
import { IWriteAuditLogRepositories } from "../../Domain/Modules/adminstration/Entities/IWriteAuditLogRepo.repositories";
import { WriteAuditLogRepositories } from "./Write/WriteAuditLog.repositories";
import { IWriteStudentRepositories } from "../../Domain/Modules/Student/Repositories/WriteStudentRepositories.repositories";
import { IWriteLandlordRepositories } from "../../Domain/Modules/Housing/Repositories/Write/WriteLandlordRepositories.repositories";

export class UnitOfWork implements IUnitOfWork {
  

  private queryRunner: QueryRunner | null = null;

  // CQRS
  public writeUserRepo!: IWriteUserRepositories;
  public writeStudentRepo!: IWriteStudentRepositories;
  public writeLandlordRepo!: IWriteLandlordRepositories;
  public writeNotificationRepo!: IWriteNotificationRepo;
  public writeApartmentRepo!: IWriteApartmentRepo;
  public writeApartmentDocumentRepo!: IWriteApartmentDocumentRepo;
  public writeAuditLogRepo!: IWriteAuditLogRepositories;

  async startTransaction(): Promise<void> {
    this.queryRunner = AppDataSource.getInstance().createQueryRunner();
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();

    const manager = this.queryRunner.manager;

    // CQRS
    this.writeUserRepo = new WriteUserRepositories(manager);
    this.writeStudentRepo = new WriteStudentRepositories(manager);
    this.writeLandlordRepo = new WriteLandlordRepositories(manager);
    this.writeNotificationRepo = new WriteNotificationRepositories(manager);
    this.writeApartmentRepo = new WriteApartmentsRepositories(manager);
    this.writeApartmentDocumentRepo = new WriteApartmentDocumentRepositories(
      manager
    );
    this.writeAuditLogRepo = new WriteAuditLogRepositories(manager);
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

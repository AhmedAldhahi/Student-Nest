import { QueryRunner } from "typeorm";
import { IUnitOfWork } from "../../Domain/Shared/Repositories/UnitOfWorkRepositories.repositories";
import { AppDataSource } from "../Database/TypeOrm/data-source";
import { IWriteLeaseRequestRepo } from "../../Domain/BoundedContexts/Leases/Repositories/Write/WriteLeaseRequestRepositories.repostitores";
import { WriteLeastRequestRepositories } from "./Write/WriteLeaseRequestRepo.repostiories";
import { IWriteAuditLogRepositories } from "../../Domain/BoundedContexts/adminstration/Repositories/IWriteAuditLogRepo.repositories";
import { IWriteApartmentDocumentRepo } from "../../Domain/BoundedContexts/Housing/Repositories/IWriteApartmentDocumentRepositoires.repositories";
import { IWriteApartmentRepo } from "../../Domain/BoundedContexts/Housing/Repositories/IWriteApartmentRepositories.repositories";
import { IWriteLandlordRepositories } from "../../Domain/BoundedContexts/IdentityAndAccess/Repositories/WriteLandlordRepositories.repositories";
import { IWriteUserRepositories } from "../../Domain/BoundedContexts/IdentityAndAccess/Repositories/WriteUserRepositories.repositories";
import { IWriteStudentRepositories } from "../../Domain/BoundedContexts/IdentityAndAccess/Repositories/WriteStudentRepositories.repositories";
import { IWriteNotificationRepo } from "../../Domain/BoundedContexts/Notifications/Repositories/IWriteNotficationRepositories.repositores";
import { WriteApartmentDocumentRepositories } from "./Write/WriteApartmentDocumentRepositories";
import { WriteApartmentsRepositories } from "./Write/WriteApartmentRepositories";
import { WriteAuditLogRepositories } from "./Write/WriteAuditLog.repositories";
import { WriteLandlordRepositories } from "./Write/WriteLandlordRepositories";
import { WriteNotificationRepositories } from "./Write/WriteNotificationRepositories";
import { WriteStudentRepositories } from "./Write/WriteStudentRepositories";
import { WriteUserRepositories } from "./Write/WriteUserRepositories";
import { IWritePaymentScheduleRepo } from "../../Domain/BoundedContexts/Payment/Repositories/WritePaymentSchedualRepositories";
import { WritePaymentScheduleRepositories } from "./Write/WritePaymentSchedulRepositories";
import { IWriteReceiptRepo } from "../../Domain/BoundedContexts/Payment/Repositories/writeReceiptRepo.Repositories";
import { PaymentReceiptRepositories } from "./Write/WritePaymentRecipt.repositories";
import { IWriteDomainEventRepo } from "../../Domain/Shared/Repositories/IWriteDomainEventRepo.repositories";

export class UnitOfWork implements IUnitOfWork {
  private queryRunner: QueryRunner | null = null;
  
  // CQRS Repositories
  public writeUserRepo!: IWriteUserRepositories;
  public writeStudentRepo!: IWriteStudentRepositories;
  public writeLandlordRepo!: IWriteLandlordRepositories;
  public writeNotificationRepo!: IWriteNotificationRepo;
  public writeApartmentRepo!: IWriteApartmentRepo;
  public writeApartmentDocumentRepo!: IWriteApartmentDocumentRepo;
  public writeAuditLogRepo!: IWriteAuditLogRepositories;
  public writeLeaseRequestRepo!: IWriteLeaseRequestRepo;
  public writePaymentScheduleRepo!: IWritePaymentScheduleRepo;
  public writePaymentReceiptRepo!: IWriteReceiptRepo;
  public writeDomainEventRepo!: IWriteDomainEventRepo;

  async startTransaction(): Promise<void> {
    this.queryRunner = AppDataSource.getInstance().createQueryRunner();
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();

    const manager = this.queryRunner.manager;

    // Initialize all repositories
    this.writeUserRepo = new WriteUserRepositories(manager);
    this.writeStudentRepo = new WriteStudentRepositories(manager);
    this.writeLandlordRepo = new WriteLandlordRepositories(manager);
    this.writeNotificationRepo = new WriteNotificationRepositories(manager);
    this.writeApartmentRepo = new WriteApartmentsRepositories(manager);
    this.writeApartmentDocumentRepo = new WriteApartmentDocumentRepositories(
      manager
    );
    this.writeAuditLogRepo = new WriteAuditLogRepositories(manager);
    this.writePaymentScheduleRepo = new WritePaymentScheduleRepositories(
      manager
    );
    this.writeLeaseRequestRepo = new WriteLeastRequestRepositories(manager);
    this.writePaymentReceiptRepo = new PaymentReceiptRepositories(manager);
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

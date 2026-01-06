import { IWriteUserRepositories } from "../../Modules/Identity/Repositories/WriteUserRepositories.repositories";
import { IWriteStudentRepositories } from "../../Modules/Student/Repositories/WriteStudentRepositories.repositories";
import { IWriteNotificationRepo } from "./IWriteNotficationRepositories.repositores";
import { IWriteApartmentRepo } from "../../Modules/Housing/Repositories/Write/IWriteApartmentRepositories.repositories";
import { IWriteApartmentDocumentRepo } from "../../Modules/Housing/Repositories/Write/IWriteApartmentDocumentRepositoires.repositories";
import { IWriteAuditLogRepositories } from "../../Modules/adminstration/Entities/IWriteAuditLogRepo.repositories";
import { IWriteLandlordRepositories } from "../../Modules/Housing/Repositories/Write/WriteLandlordRepositories.repositories";
import { IWriteLeaseRequestRepo } from "../../Modules/Leases/Repositories/Write/WriteLeaseRequestRepositories.repostitores";

export interface IUnitOfWork {
  // cqrs
  writeUserRepo: IWriteUserRepositories;
  writeStudentRepo: IWriteStudentRepositories;
  writeLandlordRepo: IWriteLandlordRepositories;
  writeNotificationRepo: IWriteNotificationRepo;
  writeApartmentRepo: IWriteApartmentRepo;
  writeApartmentDocumentRepo: IWriteApartmentDocumentRepo;
  writeAuditLogRepo: IWriteAuditLogRepositories;
  writeLeaseRequestRepo: IWriteLeaseRequestRepo;

  startTransaction(): Promise<void>;

  commitTransaction(): Promise<void>;

  rollbackTransaction(): Promise<void>;

  releaseTransaction(): Promise<void>;
}

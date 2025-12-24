import { IWriteUserRepositories } from "./Write/WriteUserRepositories.repositories";
import { IWriteStudentRepositories } from "./Write/WriteStudentRepositories.repositories";
import { IWriteLandlordRepositories } from "./Write/WriteLandlordRepositories.repositories";
import { IWriteNotificationRepo } from "./Write/IWriteNotficationRepositories.repositores";
import { IWriteApartmentRepo } from "./Write/IWriteApartmentRepositories.repositories";
import { IWriteApartmentDocumentRepo } from "./Write/IWriteApartmentDocumentRepositoires.repositories";
import { IWriteAuditLogRepositories } from "./Write/IWriteAuditLogRepo.repositories";

export interface IUnitOfWork {
  // cqrs
  writeUserRepo: IWriteUserRepositories;
  writeStudentRepo: IWriteStudentRepositories;
  writeLandlordRepo: IWriteLandlordRepositories;
  writeNotificationRepo: IWriteNotificationRepo;
  writeApartmentRepo: IWriteApartmentRepo;
  writeApartmentDocumentRepo: IWriteApartmentDocumentRepo
  writeAuditLogRepo: IWriteAuditLogRepositories

  
  startTransaction(): Promise<void>;

  commitTransaction(): Promise<void>;

  rollbackTransaction(): Promise<void>;

  releaseTransaction(): Promise<void>;
}

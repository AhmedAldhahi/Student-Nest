import { IWriteUserRepositories } from "./Write/WriteUserRepositories.repositories";
import { IWriteStudentRepositories } from "./Write/WriteStudentRepositories.repositories";
import { IWriteLandlordRepositories } from "./Write/WriteLandlordRepositories.repositories";
import { IWriteNotificationRepo } from "./Write/IWriteUpdateNotficationStatusRepositories.repositores";

export interface IUnitOfWork {
  // cqrs
  writeUserRepo: IWriteUserRepositories;
  writeStudentRepo: IWriteStudentRepositories;
  writeLandlordRepo: IWriteLandlordRepositories;
  writeNotificationRepo: IWriteNotificationRepo

  startTransaction(): Promise<void>;

  commitTransaction(): Promise<void>;

  rollbackTransaction(): Promise<void>;

  releaseTransaction(): Promise<void>;
}

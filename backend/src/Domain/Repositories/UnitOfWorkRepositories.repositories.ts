import { IUserRepository } from "./UserRepositories.repositories";
import { ILandlordRepository } from "./LandlordRepositories.repositories";
import { IStudentRepository } from "./StudentRepositories.repositories";
import { IWriteUserRepositories } from "./Write/WriteUserRepositories.repositories";
import { IWriteStudentRepositories } from "./Write/WriteStudentRepositories.repositories";
import { IWriteLandlordRepositories } from "./Write/WriteLandlordRepositories.repositories";

export interface IUnitOfWork {
  userRepo: IUserRepository;

  landlordRepo: ILandlordRepository;

  studentRepo: IStudentRepository;

  // cqrs
  writeUserRepo: IWriteUserRepositories;
  writeStudentRepo: IWriteStudentRepositories;
  writeLandlordRepo: IWriteLandlordRepositories;
  


  startTransaction(): Promise<void>;

  commitTransaction(): Promise<void>;

  rollbackTransaction(): Promise<void>;

  releaseTransaction(): Promise<void>;
}

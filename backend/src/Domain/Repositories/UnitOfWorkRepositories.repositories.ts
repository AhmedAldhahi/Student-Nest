import { IUserRepository } from "./UserRepositories.repositories";
import { ILandlordRepository } from "./LandlordRepositories.repositories";
import { IStudentRepository } from "./StudentRepositories.repositories";

export interface IUnitOfWork { 
  
  userRepo: IUserRepository;

  landlordRepo: ILandlordRepository;

  studentRepo: IStudentRepository;

  startTransaction(): Promise<void>;

  commitTransaction(): Promise<void>;

  rollbackTransaction(): Promise<void>;

  releaseTransaction(): Promise<void>;
}

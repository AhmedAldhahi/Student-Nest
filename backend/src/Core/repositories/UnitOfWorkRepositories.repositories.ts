import { QueryRunner } from "typeorm";
import { IUserRepository } from "./UserRepositories.repositories";
import { ILandlordRepository } from "./LandlordRepositories.repositories";

export interface IUnitOfWork {
  userRepo: IUserRepository;
  landlordRepo: ILandlordRepository;
  startTransaction(): Promise<void>;
  commitTransaction(): Promise<void>;
  rollbackTransaction(): Promise<void>;
  releaseTransaction(): Promise<void>;
}

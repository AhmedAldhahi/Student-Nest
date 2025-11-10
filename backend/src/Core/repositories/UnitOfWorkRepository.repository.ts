import { ILandloardRepository } from "./LandloardRepositories.repositoris";
import { IStudentRepository } from "./StudentRepoitories.repoitories";
import { IUserRepository } from "./UserRepoitories.repositories";

export interface IUnitOfWorkRepository {
  userRepotories: IUserRepository;
  StudentRepostoies: IStudentRepository;
  LandloardReposotries: ILandloardRepository;

  // method to connect with db 
  startTransaction(): Promise<void>;
  commit(): Promise<void>;
  rollBack(): Promise<void>;
}

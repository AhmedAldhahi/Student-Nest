import { UserEntity } from "../../Entities/userEntity.entity";

export interface IWriteUserRepositories { 
  addNewUser (user: UserEntity) : Promise<void>;
  updateUser(user: UserEntity): Promise<void>;
  deleteExistElement(id: string): Promise<void>;
}



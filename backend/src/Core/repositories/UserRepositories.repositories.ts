import { UserEntity } from "../entites/userEntity.entity";

export interface IUserRepository { 
    
  findById(id: string): Promise<UserEntity | null>;

  findByEmail(email: string): Promise<UserEntity | null>;

  addNewUser(user: UserEntity): Promise<void>;

  updateUser(user: UserEntity): Promise<void>;

  deleteUser(id: string): Promise<void>;
}

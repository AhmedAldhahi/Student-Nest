import { User } from "../entites/user.entity";

//TODO: we remove in future 
export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>; // in db
  save(user: User): Promise<void>; // in db
  findById(id: string): Promise<User | null>; // in db 
}





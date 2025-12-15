import { UserEntity } from "../Entites/userEntity.entity";


export interface UserResponseDTO {
  userId: string;
  name: string;
  dateOfBirth: string;
  email: string;
  role: string;
  phoneNumber: string;
  address?: string;
  photo?: string;
  createdAt: Date;
  emailVerfied: boolean;
}

export interface IUserRepository {
  findById(id: string): Promise<UserEntity | null>;

  findByEmail(email: string): Promise<UserEntity | null>;

  addNewUser(user: UserEntity): Promise<void>;

  updateUser(user: UserEntity): Promise<void>;

  deleteUser(id: string): Promise<void>;
}

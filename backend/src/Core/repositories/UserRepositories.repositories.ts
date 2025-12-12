import { UserEntity } from "../entites/userEntity.entity";
import { UserDateOfBirth } from "../value-object/UserDateOfBirth.vo";
import { UserEmail } from "../value-object/UserEmail.vo";
import { UserName } from "../value-object/UserName.vo";
import { userPhoneNumber } from "../value-object/UserPhoneNumber.vo";

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
}

export interface IUserRepository {
  findById(id: string): Promise<UserEntity | null>;

  findByEmail(email: string): Promise<UserEntity | null>;

  addNewUser(user: UserEntity): Promise<void>;

  updateUser(user: UserEntity): Promise<void>;

  deleteUser(id: string): Promise<void>;
}

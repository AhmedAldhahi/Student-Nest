import { UserEntity } from "../../Entities/userEntity.entity";

export interface IReadUserRepositories {
  findById(id: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
}

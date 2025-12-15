import { UserEntity } from "../../Entites/userEntity.entity";

export interface IReadUserRepositories {
    findById(id: string): Promise<UserEntity | null>;
    findByEmail(email: string): Promise<UserEntity | null>;
}



import { UserEntity } from "../../Entites/userEntity.entity";

export interface IWriteUserRepositories {
    addNewUser(user: UserEntity): Promise<void>;
    updateUser(user: UserEntity): Promise<void>;
    deleteUser(id: string): Promise<void>;
}


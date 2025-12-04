import { userUpdateProfileRequest } from "../../dtos/profile/adminRequest.updateProfile.profile.dtos";

export interface IProfileStrategy {
    UserProfile (userId: string): Promise<any>;
    UpdateUserProfile (userId: string,dto: userUpdateProfileRequest) : Promise<any>
}


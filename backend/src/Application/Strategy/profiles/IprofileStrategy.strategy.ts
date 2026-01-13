import { userUpdateProfileRequest } from "../../DTO/shared/profile/adminRequest.updateProfile.profile.dto";

export interface IProfileStrategy {
    UserProfile (userId: string): Promise<any>;
   UpdateUserProfile (userId: string,dto: userUpdateProfileRequest) : Promise<any>
}


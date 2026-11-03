import { BaseUpdateProfileRequest } from "../../../IdentityAndAccess/Dto/Request/BaseUpdateProfileRequest";

export interface IProfileStrategy {
  UserProfile(userId: string): Promise<any>;
  
  UpdateUserProfile(
    userId: string,
    dto: BaseUpdateProfileRequest
  ): Promise<any>;
}

import { userUpdateProfileRequest } from "./adminRequest.updateProfile.profile.dtos";

export interface LandlordUpdateProfileRequest
  extends userUpdateProfileRequest {
  cliQAccount?: string;
}

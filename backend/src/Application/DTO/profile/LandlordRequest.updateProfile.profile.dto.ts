import { userUpdateProfileRequest } from "./adminRequest.updateProfile.profile.dto";

export interface LandlordUpdateProfileRequest
  extends userUpdateProfileRequest {
  cliQAccount?: string;
}

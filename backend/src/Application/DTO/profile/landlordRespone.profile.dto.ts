import { AdminProfileResponse } from "./adminRespone.profile.dto";

export interface LandlordProfileResponse extends AdminProfileResponse {
  cliQAccount: string;
  LandlordGovId: string;
}

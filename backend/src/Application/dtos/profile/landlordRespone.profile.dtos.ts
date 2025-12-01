import { AdminProfileResponse } from "./adminRespone.profile.dtos";

export interface LandlordProfileResponse extends AdminProfileResponse {
  cliQAccount: string;
  LandlordGovId: string;
}

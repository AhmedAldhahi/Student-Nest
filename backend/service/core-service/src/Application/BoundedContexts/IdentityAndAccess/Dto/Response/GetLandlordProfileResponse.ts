import { GetUserProfileResponse } from "./GetUserProfileResponse";

export interface GetLandlordProfileResponse extends GetUserProfileResponse {
  LandlordGovId: string | undefined;
  cliQAccount: string | undefined;
  document: string | undefined;
  verifiedLandlord: boolean;
}

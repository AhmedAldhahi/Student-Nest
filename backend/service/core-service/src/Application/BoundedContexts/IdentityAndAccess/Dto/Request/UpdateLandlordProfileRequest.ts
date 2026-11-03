import { BaseUpdateProfileRequest } from "./BaseUpdateProfileRequest";

export interface UpdateLandlordProfileRequest extends BaseUpdateProfileRequest {
  cliQAccount?: string;
}

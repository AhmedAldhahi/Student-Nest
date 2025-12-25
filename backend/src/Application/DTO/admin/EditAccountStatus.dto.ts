import { UserAccountStatus } from "../../../Domain/Enum/UserAccountStatus.enum";

export interface EditUserActivateStatsRequest {
  data: UserAccountStatus;
}

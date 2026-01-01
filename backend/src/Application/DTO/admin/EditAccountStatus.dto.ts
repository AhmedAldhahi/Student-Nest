import { UserAccountStatus } from "../../../Domain/Shared/Enum/UserAccountStatus.enum";

export interface EditUserActivateStatsRequest {
  data: UserAccountStatus;
}

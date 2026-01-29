import { GetUserProfileResponse } from "./GetUserProfileResponse";

export interface GetStudentProfileResponse extends GetUserProfileResponse {
  major: string | undefined;
  gradateYear: number | undefined;
  studentCardId: string | undefined;
  universityName: string | undefined;
  studentGovId: string | undefined;
  verificationFile: string | undefined;
  roommateProfileStatus: boolean;
}

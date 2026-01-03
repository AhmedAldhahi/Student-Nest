import { AdminProfileResponse } from "./adminRespone.profile.dto";

export interface StudentProfileResponse extends AdminProfileResponse {
  major: string;
  gradateYear: number;
  studentCardId: string;
  universityName: string;
  studentGovId: string;
  verificationFile: Express.Multer.File;
}

import { BaseUpdateProfileRequest } from "./BaseUpdateProfileRequest";

export interface UpdateStudentProfileRequest extends BaseUpdateProfileRequest {
  major?: string;
  gradateYear?: number;
  studentCardId?: string;
  universityName?: string;
  verificationFile?: Express.Multer.File;
}

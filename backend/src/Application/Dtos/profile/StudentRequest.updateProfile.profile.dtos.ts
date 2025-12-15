import { userUpdateProfileRequest } from "./adminRequest.updateProfile.profile.dtos";

export interface StudentUpdateProfileRequest extends userUpdateProfileRequest {
  major?: string;
  gradateYear?: number;
  studentCardId?: string;
  universityName?: string;
  verificationFile?: Express.Multer.File;
}

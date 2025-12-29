import { UserRole } from "../../../Domain/Enum/UserRole.enum";

export interface RegisterStudentRequest {
  // require
  email: string;
  name: string;
  password: string;
  role: UserRole.student;
  dateOfBirth: string;
  phoneNumber: string;
  
  major: string;
  gradateYear: number;
  studentCardId: string;
  universityName: string;
  studentGovId: string;
  verificationFile: Express.Multer.File;
  
  address?: string;
}

  

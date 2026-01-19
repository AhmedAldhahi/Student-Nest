import { GovernmentID } from "../Value-Object/UserGovId.vo";
import { VerificationDocument } from "../Value-Object/VerficationDocument.vo";
import { UserEntity } from "../Entities/userEntity.entity";
import { StudentCard } from "../Value-Object/StudentCard.vo";
import { studentGraduateYear } from "../Value-Object/StudentGraduateYear.vo";
import { StudentMajor } from "../Value-Object/StudentMajor.vo";
import { StudentUniversity } from "../Value-Object/StudentUniversity.vo";

// export interface IStudentData {
//   userId: string;
//   userGovId: GovernmentID;
//   graduateYear: studentGraduateYear;
//   major: StudentMajor;
//   universityName: StudentUniversity;
//   studentCardId: StudentCard;
//   validateStudentDocument: VerificationDocument;
//   //private walletAddress: string = "";
// }

export type StudentDataType = {
  userId: string;
  userGovId: GovernmentID;
  graduateYear: studentGraduateYear;
  major: StudentMajor;
  universityName: StudentUniversity;
  studentCardId: StudentCard;
  validateStudentDocument: VerificationDocument;
  roommateProfileStatus:boolean
  //walletAddress: string = "";
};

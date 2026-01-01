import { GovernmentID } from "../../../Shared/Value-Object/UserGovId.vo";
import { VerificationDocument } from "../../../Shared/Value-Object/VerficationDocument.vo";
import { UserEntity } from "../../Identity/Entities/userEntity.entity";
import { StudentCard } from "../Value-Object/StudentCard.vo";
import { studentGraduateYear } from "../Value-Object/StudentGraduateYear.vo";
import { StudentMajor } from "../Value-Object/StudentMajor.vo";
import { StudentUniversity } from "../Value-Object/StudentUniversity.vo";

export interface IStudentData {
  userId: string;
  userGovId: GovernmentID;
  graduateYear: studentGraduateYear;
  major: StudentMajor;
  universityName: StudentUniversity;
  studentCardId: StudentCard;
  validateStudentDocument: VerificationDocument;
  //private walletAddress: string = "";
}

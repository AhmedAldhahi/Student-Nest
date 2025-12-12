import { StudentUniversity } from "../../../test/backend/unit/vo/StudentUniversity.vo.test";
import { StudentEntity } from "../entites/studentEntity.entity";
import { StudentCard } from "../value-object/StudentCard.vo";
import { studentGraduateYear } from "../value-object/StudentGraduateYear.vo";
import { StudentMajor } from "../value-object/StudentMajor.vo";
import { GovernmentID } from "../value-object/UserGovId.vo";
import { UserResponseDTO } from "./UserRepositories.repositories";

export interface StudentResponseDto {
  user: UserResponseDTO;
  GraduationYear: number;
  Major: string;
  studentCardID: string;
  userGovId: string;
  universityName: string;
  studentValidateDocument: string;
}
export interface IStudentRepository {
  createNewStudent(user: StudentEntity): Promise<void>;
  updateStudent(user: StudentEntity): Promise<void>;
  findStudentById(userId: string): Promise<StudentEntity | null>;

  findAllStudent(): Promise<StudentResponseDto[] | null>;
}

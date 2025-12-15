import { UserResponseDTO } from "./UserRepositories.repositories";
import { StudentAggregateRoot } from "../AggregatesRoot/studentEntity.entity";

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
  createNewStudent(user: StudentAggregateRoot): Promise<void>;
  updateStudent(user: StudentAggregateRoot): Promise<void>;
  findStudentById(userId: string): Promise<StudentAggregateRoot | null>;

  findAllStudent(): Promise<StudentResponseDto[] | null>;
}

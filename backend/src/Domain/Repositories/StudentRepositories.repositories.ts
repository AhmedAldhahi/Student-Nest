import { StudentResponseDto } from "../../Application/Dtos/profile/StudentResponseDto";
import { StudentAggregateRoot } from "../AggregatesRoot/studentEntity.entity";


export interface IStudentRepository {
  createNewStudent(user: StudentAggregateRoot): Promise<void>;
  updateStudent(user: StudentAggregateRoot): Promise<void>;
  findStudentById(userId: string): Promise<StudentAggregateRoot | null>;

  findAllStudent(): Promise<StudentResponseDto[] | null>;
}

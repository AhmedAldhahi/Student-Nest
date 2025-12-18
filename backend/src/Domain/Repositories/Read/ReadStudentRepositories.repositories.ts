import { StudentResponseDto } from "../../../Application/Dtos/profile/StudentResponseDto";
import { StudentAggregateRoot } from "../../AggregatesRoot/studentEntity.entity";

export interface IReadStudentRepositories {
  findStudentById(userId: string): Promise<StudentAggregateRoot | null>;
  findAllStudent(): Promise<StudentResponseDto[] | null>;
}

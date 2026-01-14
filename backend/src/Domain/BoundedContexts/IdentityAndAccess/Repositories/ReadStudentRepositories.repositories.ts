import { StudentAggregateRoot } from "../Aggregates/StudentAggregateRoot.entity";
import { StudentResponseDto } from "../Representations/StudentResponseDTO";

export interface IReadStudentRepositories {
  findStudentById(userId: string): Promise<StudentAggregateRoot | null>;
  findAllStudent(): Promise<StudentResponseDto[] | null>;
  searchByQuery(prefix: string): Promise<StudentResponseDto[] | null>;
}

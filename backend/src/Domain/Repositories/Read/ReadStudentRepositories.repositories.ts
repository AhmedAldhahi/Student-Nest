import { StudentAggregateRoot } from "../../AggregatesRoot/studentEntity.entity";

export interface IReadStudentRepositories {
  findStudentById(userId: string): Promise<StudentAggregateRoot | null>;
}

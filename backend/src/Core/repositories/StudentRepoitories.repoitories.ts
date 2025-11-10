import { Student } from "../entites/student.entity";

export interface IStudentRepository {
  findByEmail(email: string): Promise<Student | null>;
  save(user: Student): Promise<void>;
  findById(id: string): Promise<Student | null>;
}

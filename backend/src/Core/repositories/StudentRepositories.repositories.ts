import { StudentEntity } from "../entites/studentEntity.entity";

export interface IStudentRepository {
  createNewStudent(user: StudentEntity): Promise<void>;
  updateStudent(user: StudentEntity): Promise<void>;
  findStudentById(userId: string): Promise<StudentEntity | null>;
}

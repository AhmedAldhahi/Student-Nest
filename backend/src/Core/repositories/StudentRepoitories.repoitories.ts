import { Student } from "../entites/student.entity";

export interface IStudentRepository {
  findByEmail(email: string): Promise<Student | null>; // in db
  save(user: Student): Promise<void>; // in db
  findById(id: string): Promise<Student | null>; // in db 
}

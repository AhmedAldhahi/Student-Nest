import { Student } from "../entites/student.entity";
import { UserRole } from "../enum/UserRole.enum";

export interface IStudentbuilder {
  buildMajor(studendMajor: string): this;
  buildGraduateYear(studentGraduateYear: number): this;
  buildUnversityName(studentUnversityName: string): this;
  buildStudentCardId(studentCardId: string): this;
  buildStudentGovId(studentGovId: string): this;
  buildUserId(userId: string): this;

  buildDateOfBirth(userBirth: string): this;

  buildHash(userPass: string): this;

  buildName(userName: string): this;

  buildRole(userRole: UserRole): this;

  buildPhoneNumber(userPhone: string): this;

  buildEmail(userEmail: string): this;

  buildAddress(userAddress: string): this; 

  //TODO: add builder for verfiedstudent document 

  
  build(): Student;
}

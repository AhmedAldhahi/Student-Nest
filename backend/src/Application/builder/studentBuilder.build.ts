import { Student } from "../../Core/entites/student.entity";
import { UserRole } from "../../Core/enum/UserRole.enum";
import { IStudentbuilder } from "../../Core/interface/IStudentBuilder.builder";

export class StudentBuilder  implements IStudentbuilder {
  private student: Student;

  constructor() { 
    this.student = new Student();
  }

  build(): Student {
    if (
      !this.student.getUserId() ||
      !this.student.getPassword() ||
      !this.student.getEmail() ||
      !this.student.getName() ||
      !this.student.getRole() ||
      !this.student.getDateOfBirth() ||
      !this.student.getPhoeNumber() ||
      !this.student.getMajor() ||
      !this.student.getGraduateYear() ||
      !this.student.getStudentCardId() ||
      !this.student.getStudentGovId() ||
      !this.student.getUnverstiyName()
    ) {
      throw new Error("Missing required properties to build User.");
    }

    return this.student;
  }

  buildAddress(userAddress: string): this {
    this.student.setAddress(userAddress);
    return this;
  }

  buildDateOfBirth(userBirth: string): this {
    this.student.setDateOfBirth(userBirth);
    return this;
  }

  buildEmail(userEmail: string): this {
    this.student.setEmail(userEmail);
    return this;
  }

  buildGraduateYear(studentGraduateYear: number): this {
    this.student.setGraduateYear(studentGraduateYear);
    return this;
  }

  buildHash(userPass: string): this {
    this.student.setPass(userPass);
    return this;
  }

  buildMajor(studendMajor: string): this {
    this.student.setMajor(studendMajor);
    return this;
  }

  buildName(userName: string): this {
    this.student.setName(userName);
    return this;
  }

  buildPhoneNumber(userPhone: string): this {
    this.student.setPhoneNumber(userPhone);
    return this;
  }

  buildRole(userRole: UserRole): this {
    this.student.setRole(userRole);
    return this;
  }

  buildStudentCardId(studentCardId: string): this {
    this.student.setstudentCardId(studentCardId);
    return this;
  }

  buildStudentGovId(studentGovId: string): this {
    this.student.setStudentGovId(studentGovId);
    return this;
  }

  buildUnversityName(studentUnversityName: string): this {
    this.student.setUnversityName(studentUnversityName);
    return this;
  }

  buildUserId(userId: string): this {
    this.student.setUserId(userId);
    return this;
  }
}

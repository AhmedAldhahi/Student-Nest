// src/infrastructure/database/repositories/student.mapper.ts

import { Student as DomainStudent } from "../../../Core/entites/student.entity"; // Adjust path

import { Student as TypeOrmStudent } from "../orm/TypeOrm/entity/Student.entity";
import { User as TypeOrmUser } from "../orm/TypeOrm/entity/User.entity";

export class StudentMapper {
  /**
   * Converts a TypeORM Student (with its nested User) into a single Domain Student.
   */
  public static toDomain(dbStudent: TypeOrmStudent): DomainStudent {
    const domainStudent = new DomainStudent();

    // 1. Map all the User properties (from the nested dbStudent.user)
    if (dbStudent.user) {
      domainStudent.setUserId(dbStudent.user.userId);
      domainStudent.setName(dbStudent.user.Name);
      domainStudent.setEmail(dbStudent.user.Email);
      domainStudent.setPass(dbStudent.user.Password);
      domainStudent.setRole(dbStudent.user.Role);
      domainStudent.setDateOfBirth(dbStudent.user.DateOfBirth);
      domainStudent.setPhoneNumber(dbStudent.user.PhoneNumber);
      domainStudent.setAccountStatus(dbStudent.user.isActive); // Using the setter

      if (dbStudent.user.otpCode) {
        domainStudent.setOtpCode(dbStudent.user.otpCode);
      }
      if (dbStudent.user.otpExpired) {
        domainStudent.setOtpExpired(dbStudent.user.otpExpired);
      }

      if (dbStudent.user.emailVerfied) {
        domainStudent.setVerfiedEmail();
      }
      if (dbStudent.user.Photo) {
        domainStudent.setPhoto(dbStudent.user.Photo);
      }
      if (dbStudent.user.Address) {
        domainStudent.setAddress(dbStudent.user.Address);
      }
    }

    // 2. Map all the Student-specific properties (from dbStudent)
    domainStudent.setMajor(dbStudent.Major);
    domainStudent.setUnversityName(dbStudent.UniversityName); // Assuming name is fixed
    domainStudent.setGraduateYear(dbStudent.GraduationYear); // Assuming name is fixed
    domainStudent.setstudentCardId(dbStudent.StudentCardId); // Assuming name is fixed
    domainStudent.setStudentGovId(dbStudent.StudentGovId);

    return domainStudent;
  }

  /**
   * Converts a single Domain Student back into a TypeORM Student
   * and a nested TypeORM User for saving.
   */
  public static toPersistence(domainStudent: DomainStudent): TypeOrmStudent {
    // 1. Create the TypeOrmUser and map its properties
    const dbUser = new TypeOrmUser();
    dbUser.userId = domainStudent.getUserId();
    dbUser.Name = domainStudent.getName();
    dbUser.Email = domainStudent.getEmail();
    dbUser.Password = domainStudent.getPassword();
    dbUser.Role = domainStudent.getRole();
    dbUser.DateOfBirth = domainStudent.getDateOfBirth();
    dbUser.PhoneNumber = domainStudent.getPhoeNumber();
    dbUser.isActive = domainStudent.getAccountStatus();
    dbUser.emailVerfied = domainStudent.getVerfiedEmail();
    dbUser.Photo = domainStudent.getPhoto();
    dbUser.Address = domainStudent.getAddress();

    dbUser.otpCode = domainStudent.getOtpCode();
    dbUser.otpExpired = domainStudent.getOtpExpired();

    // 2. Create the TypeOrmStudent and map its properties
    const dbStudent = new TypeOrmStudent();
    dbStudent.userId = domainStudent.getUserId(); // Shared key
    dbStudent.Major = domainStudent.getMajor();
    dbStudent.UniversityName = domainStudent.getUnverstiyName(); // Assuming name is fixed
    dbStudent.GraduationYear = domainStudent.getGraduateYear(); // Assuming name isB fixed
    dbStudent.StudentCardId = domainStudent.getStudentCardId(); // Assuming name is fixed
    dbStudent.StudentGovId = domainStudent.getStudentGovId(); 

    

    // 3. Nest the dbUser inside the dbStudent
    dbStudent.user = dbUser;

    return dbStudent;
  }
}

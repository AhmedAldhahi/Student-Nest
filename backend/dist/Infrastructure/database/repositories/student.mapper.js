"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentMapper = void 0;
const student_entity_1 = require("../../../Core/entites/student.entity");
const Student_entity_1 = require("../orm/TypeOrm/entity/Student.entity");
const User_entity_1 = require("../orm/TypeOrm/entity/User.entity");
class StudentMapper {
    static toDomain(dbStudent) {
        const domainStudent = new student_entity_1.Student();
        if (dbStudent.user) {
            domainStudent.setUserId(dbStudent.user.userId);
            domainStudent.setName(dbStudent.user.Name);
            domainStudent.setEmail(dbStudent.user.Email);
            domainStudent.setPass(dbStudent.user.Password);
            domainStudent.setRole(dbStudent.user.Role);
            domainStudent.setDateOfBirth(dbStudent.user.DateOfBirth);
            domainStudent.setPhoneNumber(dbStudent.user.PhoneNumber);
            domainStudent.setAccountStatus(dbStudent.user.isActive);
            if (dbStudent.user.otpCode) {
                domainStudent.setOtpCode(dbStudent.user.otpCode);
            }
            if (dbStudent.user.otpExpired) {
                domainStudent.setOtpExpired(dbStudent.user.otpExpired);
            }
            if (dbStudent.user.Photo) {
                domainStudent.setPhoto(dbStudent.user.Photo);
            }
            if (dbStudent.user.Address) {
                domainStudent.setAddress(dbStudent.user.Address);
            }
        }
        domainStudent.setMajor(dbStudent.Major);
        domainStudent.setUnversityName(dbStudent.UniversityName);
        domainStudent.setGraduateYear(dbStudent.GraduationYear);
        domainStudent.setstudentCardId(dbStudent.StudentCardId);
        domainStudent.setStudentGovId(dbStudent.StudentGovId);
        return domainStudent;
    }
    static toPersistence(domainStudent) {
        const dbUser = new User_entity_1.User();
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
        const dbStudent = new Student_entity_1.Student();
        dbStudent.userId = domainStudent.getUserId();
        dbStudent.Major = domainStudent.getMajor();
        dbStudent.UniversityName = domainStudent.getUnverstiyName();
        dbStudent.GraduationYear = domainStudent.getGraduateYear();
        dbStudent.StudentCardId = domainStudent.getStudentCardId();
        dbStudent.StudentGovId = domainStudent.getStudentGovId();
        dbStudent.user = dbUser;
        return dbStudent;
    }
}
exports.StudentMapper = StudentMapper;

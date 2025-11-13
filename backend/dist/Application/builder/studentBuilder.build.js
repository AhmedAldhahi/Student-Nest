"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentBuilder = void 0;
const student_entity_1 = require("../../Core/entites/student.entity");
class StudentBuilder {
    constructor() {
        this.student = new student_entity_1.Student();
    }
    build() {
        if (!this.student.getUserId() ||
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
            !this.student.getUnverstiyName()) {
            throw new Error("Missing required properties to build User.");
        }
        return this.student;
    }
    buildAddress(userAddress) {
        this.student.setAddress(userAddress);
        return this;
    }
    buildDateOfBirth(userBirth) {
        this.student.setDateOfBirth(userBirth);
        return this;
    }
    buildEmail(userEmail) {
        this.student.setEmail(userEmail);
        return this;
    }
    buildGraduateYear(studentGraduateYear) {
        this.student.setGraduateYear(studentGraduateYear);
        return this;
    }
    buildHash(userPass) {
        this.student.setPass(userPass);
        return this;
    }
    buildMajor(studendMajor) {
        this.student.setMajor(studendMajor);
        return this;
    }
    buildName(userName) {
        this.student.setName(userName);
        return this;
    }
    buildPhoneNumber(userPhone) {
        this.student.setPhoneNumber(userPhone);
        return this;
    }
    buildRole(userRole) {
        this.student.setRole(userRole);
        return this;
    }
    buildStudentCardId(studentCardId) {
        this.student.setstudentCardId(studentCardId);
        return this;
    }
    buildStudentGovId(studentGovId) {
        this.student.setStudentGovId(studentGovId);
        return this;
    }
    buildUnversityName(studentUnversityName) {
        this.student.setUnversityName(studentUnversityName);
        return this;
    }
    buildUserId(userId) {
        this.student.setUserId(userId);
        return this;
    }
}
exports.StudentBuilder = StudentBuilder;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentEntity = void 0;
class StudentEntity {
    constructor(data) {
        this.user = data.user;
        this.studentCardID = data.studentCardId;
        this.userGovId = data.userGovId;
        this.universityName = data.universityName;
        this.graduateYear = data.graduateYear;
        this.major = data.major;
        this.studentValidateDocument = data.validateStudentDocument;
    }
    updateStudentCardID(userCardId) {
        if (!this.updateUniversityName)
            throw new Error("you have to change your university before change card id ");
        this.studentCardID = userCardId;
    }
    getStudentCardID() {
        return this.studentCardID.getValue();
    }
    updateUniversityName(newUniversity) {
        this.universityName = newUniversity;
    }
    getUniversityName() {
        return this.universityName.getValue();
    }
    updateMajor(major) {
        this.major = major;
    }
    getMajor() {
        return this.major.getValue();
    }
    updateGraduateYear(stdGraduateYear) {
        if (Number.parseInt(this.user.getDateOfBirth()) >=
            this.graduateYear.getValue())
            throw new Error("invalid date, student can not graduate before he born !!");
        this.graduateYear = stdGraduateYear;
    }
    getGraduateYear() {
        return this.graduateYear.getValue();
    }
    updateVerificationDocument(document) {
        this.studentValidateDocument = document;
    }
    getVerificationDocument() {
        return this.studentValidateDocument.getValue();
    }
    getGovernmentId() {
        return this.userGovId.getValue();
    }
    getUser() {
        return this.user;
    }
    getUserId() {
        return this.user.getUserId();
    }
}
exports.StudentEntity = StudentEntity;

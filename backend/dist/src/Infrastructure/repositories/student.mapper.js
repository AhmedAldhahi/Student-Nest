"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentMapper = void 0;
const studentEntity_entity_1 = require("../../Core/entites/studentEntity.entity");
const StudentCard_vo_1 = require("../../Core/value-object/StudentCard.vo");
const StudentGraduateYear_vo_1 = require("../../Core/value-object/StudentGraduateYear.vo");
const StudentUniversity_vo_1 = require("../../Core/value-object/StudentUniversity.vo");
const StudentVerficationDocument_vo_1 = require("../../Core/value-object/StudentVerficationDocument.vo");
const UserGovId_vo_1 = require("../../Core/value-object/UserGovId.vo");
const StudentMajor_vo_1 = require("../../Core/value-object/StudentMajor.vo");
const Student_entity_1 = require("../database/orm/TypeOrm/entity/Student.entity");
const user_mapper_1 = require("./user.mapper");
class StudentMapper {
    static toEntity(stdModel) {
        return new studentEntity_entity_1.StudentEntity({
            user: user_mapper_1.UserMapper.toEntity(stdModel.user),
            studentCardId: new StudentCard_vo_1.StudentCard(stdModel.StudentCardId),
            userGovId: new UserGovId_vo_1.GovernmentID(stdModel.StudentGovId),
            universityName: new StudentUniversity_vo_1.StudentUniversity(stdModel.UniversityName),
            graduateYear: new StudentGraduateYear_vo_1.studentGraduateYear(stdModel.GraduationYear),
            major: new StudentMajor_vo_1.StudentMajor(stdModel.Major),
            validateStudentDocument: new StudentVerficationDocument_vo_1.StudentVerificationDocument(stdModel.verificationFiles),
        });
    }
    static toModel(stdEntity) {
        const userModel = new Student_entity_1.StudentModel();
        userModel.user = user_mapper_1.UserMapper.toOrm(stdEntity.getUser());
        userModel.userId = stdEntity.getUserId();
        userModel.StudentCardId = stdEntity.getStudentCardID();
        userModel.StudentGovId = stdEntity.getGovernmentId();
        userModel.UniversityName = stdEntity.getUniversityName();
        userModel.GraduationYear = stdEntity.getGraduateYear();
        userModel.Major = stdEntity.getMajor();
        userModel.verificationFiles = stdEntity.getVerificationDocument();
        return userModel;
    }
}
exports.StudentMapper = StudentMapper;

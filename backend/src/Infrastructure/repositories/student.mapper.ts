import { StudentEntity } from "../../Core/entites/studentEntity.entity";
import { StudentCard } from "../../Core/value-object/StudentCard.vo";
import { studentGraduateYear } from "../../Core/value-object/StudentGraduateYear.vo";
import { StudentUniversity } from "../../Core/value-object/StudentUniversity.vo";
import { VerificationDocument } from "../../Core/value-object/VerficationDocument.vo";
import { GovernmentID } from "../../Core/value-object/UserGovId.vo";
import { StudentMajor } from "../../Core/value-object/StudentMajor.vo"; // 1. Added Import
import { StudentModel } from "../database/orm/TypeOrm/entity/Student.entity";
import { UserMapper } from "./user.mapper";

export class StudentMapper {
  public static toEntity(stdModel: StudentModel): StudentEntity {
    return new StudentEntity({
      user: UserMapper.toEntity(stdModel.user),
      studentCardId: new StudentCard(stdModel.StudentCardId),
      userGovId: new GovernmentID(stdModel.StudentGovId),
      universityName: new StudentUniversity(stdModel.UniversityName),
      graduateYear: new studentGraduateYear(stdModel.GraduationYear),
      major: new StudentMajor(stdModel.Major),

      validateStudentDocument: new VerificationDocument(
        stdModel.verificationFiles
      ),
    });
  }

  public static toModel(stdEntity: StudentEntity): StudentModel {
    const userModel = new StudentModel();

    userModel.user = UserMapper.toOrm(stdEntity.getUser());
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

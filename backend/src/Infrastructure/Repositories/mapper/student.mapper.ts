import { StudentAggregateRoot } from "../../../Domain/AggregatesRoot/studentEntity.entity";
import { StudentCard } from "../../../Domain/Value-Object/StudentCard.vo";
import { studentGraduateYear } from "../../../Domain/Value-Object/StudentGraduateYear.vo";
import { StudentMajor } from "../../../Domain/Value-Object/StudentMajor.vo";
import { StudentUniversity } from "../../../Domain/Value-Object/StudentUniversity.vo";
import { GovernmentID } from "../../../Domain/Value-Object/UserGovId.vo";
import { VerificationDocument } from "../../../Domain/Value-Object/VerficationDocument.vo";
import { StudentModel } from "../../Database/orm/TypeOrm/entity/Student.entity";
import { UserMapper } from "./user.mapper";


export class StudentMapper {
  public static toEntity(stdModel: StudentModel): StudentAggregateRoot {
    return new StudentAggregateRoot({
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

  public static toModel(stdEntity: StudentAggregateRoot): StudentModel {
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

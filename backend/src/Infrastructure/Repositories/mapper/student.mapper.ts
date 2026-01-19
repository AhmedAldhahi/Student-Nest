import { StudentAggregateRoot } from "../../../Domain/BoundedContexts/IdentityAndAccess/Aggregates/StudentAggregateRoot.entity";
import { StudentResponseDto } from "../../../Domain/BoundedContexts/IdentityAndAccess/Representations/StudentResponseDTO";
import { StudentCard } from "../../../Domain/BoundedContexts/IdentityAndAccess/Value-Object/StudentCard.vo";
import { studentGraduateYear } from "../../../Domain/BoundedContexts/IdentityAndAccess/Value-Object/StudentGraduateYear.vo";
import { StudentMajor } from "../../../Domain/BoundedContexts/IdentityAndAccess/Value-Object/StudentMajor.vo";
import { StudentUniversity } from "../../../Domain/BoundedContexts/IdentityAndAccess/Value-Object/StudentUniversity.vo";
import { GovernmentID } from "../../../Domain/BoundedContexts/IdentityAndAccess/Value-Object/UserGovId.vo";
import { VerificationDocument } from "../../../Domain/BoundedContexts/IdentityAndAccess/Value-Object/VerficationDocument.vo";
import { StudentModel } from "../../Database/TypeOrm/entity/Student.entity";

export class StudentMapper {
  public static toEntity(stdModel: StudentModel): StudentAggregateRoot {
    return new StudentAggregateRoot({
      userId: stdModel.userId,
      studentCardId: new StudentCard(stdModel.StudentCardId),
      userGovId: new GovernmentID(stdModel.StudentGovId),
      universityName: new StudentUniversity(stdModel.UniversityName),
      graduateYear: new studentGraduateYear(stdModel.GraduationYear),
      major: new StudentMajor(stdModel.Major),
      roommateProfileStatus: stdModel.roommateProfileStatus,

      validateStudentDocument: new VerificationDocument(
        stdModel.verificationFiles,
      ),
    });
  }

  public static toResponse(stdModel: StudentModel): StudentResponseDto {
    return {
      user: {
        userId: stdModel.user.userId,
        name: stdModel.user.Name,
        dateOfBirth: stdModel.user.DateOfBirth,
        email: stdModel.user.Email,
        role: stdModel.user.Role,
        phoneNumber: stdModel.user.PhoneNumber,
        address: stdModel.user.Address,
        photo: stdModel.user.Photo,
        createdAt: stdModel.user.createAt,
        emailVerified: stdModel.user.emailVerfied,
      },
      GraduationYear: stdModel.GraduationYear,
      Major: stdModel.Major,
      studentCardID: stdModel.StudentCardId,
      userGovId: stdModel.StudentGovId,
      universityName: stdModel.UniversityName,
      studentValidateDocument: stdModel.verificationFiles,
      roommateProfileStatus: stdModel.roommateProfileStatus,
    };
  }

  public static toModel(stdEntity: StudentAggregateRoot): StudentModel {
    const validationData = this.toModelValidation(stdEntity);
    const userModel = new StudentModel();

    userModel.userId = stdEntity.getUserId();
    userModel.StudentCardId = validationData.stdCardId;
    userModel.StudentGovId = validationData.stdGovId;
    userModel.UniversityName = validationData.stdUnv;
    userModel.GraduationYear = validationData.stdGrdYear;
    userModel.Major = validationData.stdMajor;
    userModel.verificationFiles = validationData.stdFile;

    return userModel;
  }

  private static toModelValidation(stdEntity: StudentAggregateRoot) {
    const stdCardId = stdEntity.getStudentCardID();
    const stdGovId = stdEntity.getGovernmentId();
    const stdUnv = stdEntity.getUniversityName();
    const stdGrdYear = stdEntity.getGraduateYear();
    const stdMajor = stdEntity.getMajor();
    const stdFile = stdEntity.getVerificationDocument();

    if (!stdCardId)
      throw new Error("Cannot save student, card Id is require !!");

    if (!stdGovId)
      throw new Error("Cannot save student, Government id is require !!");

    if (!stdUnv)
      throw new Error("Cannot save student, university name is require !!");

    if (!stdGrdYear)
      throw new Error("Cannot save student, graduate year is require !!");
    if (!stdMajor) throw new Error("Cannot save student,major is require !!");

    if (!stdFile)
      throw new Error("Cannot save student, verification file is require !!");

    return { stdCardId, stdGovId, stdUnv, stdGrdYear, stdMajor, stdFile };
  }
}

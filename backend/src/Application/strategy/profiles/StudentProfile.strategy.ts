import { IStudentRepository } from "../../../Core/repositories/StudentRepositories.repositories";
import { StudentCard } from "../../../Core/value-object/StudentCard.vo";
import { studentGraduateYear } from "../../../Core/value-object/StudentGraduateYear.vo";
import { StudentMajor } from "../../../Core/value-object/StudentMajor.vo";
import { StudentUniversity } from "../../../Core/value-object/StudentUniversity.vo";
import { StudentVerificationDocument } from "../../../Core/value-object/StudentVerficationDocument.vo";
import { UserDateOfBirth } from "../../../Core/value-object/UserDateOfBirth.vo";
import { UserName } from "../../../Core/value-object/UserName.vo";
import { userPhoneNumber } from "../../../Core/value-object/UserPhoneNumber.vo";
import { StudentUpdateProfileRequest } from "../../dtos/profile/StudentRequest.updateProfile.profile.dtos";
import { IFileStorageService } from "../../interfaces/IFileStorage.interface";
import { IPasswordService } from "../../interfaces/IPassword.interface";
import { IProfileStrategy } from "./IprofileStrategy.strategy";

export class StudentProfileStrategy implements IProfileStrategy {
  constructor(
    private studentRep: IStudentRepository,
    private readonly passwordService: IPasswordService,
    private readonly fileService: IFileStorageService
  ) {}

  public async UserProfile(userId: string): Promise<any> {
    const user = await this.studentRep.findStudentById(userId);
    if (!user) throw new Error("no user found !!");

    return {
      email: user.getUser().getEmail(),
      name: user.getUser().getName(),
      role: user.getUser().getRole(),
      dateOfBirth: user.getUser().getDateOfBirth(),
      phoneNumber: user.getUser().getPhoneNumber(),

      address: user.getUser().getAddress(),
      photo: user.getUser().getPhoto(),
      major: user.getMajor(),
      gradateYear: user.getGraduateYear(),
      studentCardId: user.getStudentCardID(),
      universityName: user.getUniversityName(),
      studentGovId: user.getGovernmentId(),
      verificationFile: user.getVerificationDocument(),
    };
  }

  public async UpdateUserProfile(
    userId: string,
    dto: StudentUpdateProfileRequest
  ): Promise<any> {
    try {
      const user = await this.studentRep.findStudentById(userId);

      if (!user) throw new Error("no user found !!");

      if (dto.address) user.getUser().setAddress(dto.address);

      if (dto.dateOfBirth)
        user.getUser().updateDateOfBirth(new UserDateOfBirth(dto.dateOfBirth));

      if (dto.name) user.getUser().updateName(new UserName(dto.name));

      if (dto.phoneNumber)
        user.getUser().updatePhoneNumber(new userPhoneNumber(dto.phoneNumber));

      if (dto.photo) {
        let photoDoc: string = await this.fileService.upload(dto.photo);
        user.getUser().setPhoto(photoDoc);
      }

      if (dto.newPassword && dto.oldPassword) {
        const validatePass = await this.passwordService.compare(
          dto.oldPassword,
          user.getUser().getPass()
        );

        if (!validatePass) throw new Error("old pass is not correct");
        const newPass = await this.passwordService.hash(dto.newPassword);

        if (
          await this.passwordService.compare(newPass, user.getUser().getPass())
        )
          throw new Error("you use this password before");
      }

      if (dto.major) {
        user.updateMajor(new StudentMajor(dto.major));
      }

      if (dto.gradateYear) {
        user.updateGraduateYear(new studentGraduateYear(dto.gradateYear));
      }

      if (dto.studentCardId) {
        user.updateStudentCardID(new StudentCard(dto.studentCardId));
      }

      if (dto.universityName) {
        user.updateUniversityName(new StudentUniversity(dto.universityName));
      }

      if (dto.verificationFile) {
        let verifiedFile: string = await this.fileService.upload(
          dto.verificationFile
        );

        user.updateVerificationDocument(
          new StudentVerificationDocument(verifiedFile)
        );
      }

      await this.studentRep.updateStudent(user);

      return {
        message: "student updated profile succfully ",
      };
      
    } catch (error: any) {
      console.error("fail to update student profile", error);
      throw error;
    }
  }
}

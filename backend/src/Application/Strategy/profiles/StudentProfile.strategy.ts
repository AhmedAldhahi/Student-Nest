import { IStudentRepository } from "../../../Domain/Repositories/StudentRepositories.repositories";
import { StudentCard } from "../../../Domain/Value-Object/StudentCard.vo";
import { studentGraduateYear } from "../../../Domain/Value-Object/StudentGraduateYear.vo";
import { StudentMajor } from "../../../Domain/Value-Object/StudentMajor.vo";
import { StudentUniversity } from "../../../Domain/Value-Object/StudentUniversity.vo";
import { UserDateOfBirth } from "../../../Domain/Value-Object/UserDateOfBirth.vo";
import { UserName } from "../../../Domain/Value-Object/UserName.vo";
import { userPhoneNumber } from "../../../Domain/Value-Object/UserPhoneNumber.vo";
import { VerificationDocument } from "../../../Domain/Value-Object/VerficationDocument.vo";
import { StudentUpdateProfileRequest } from "../../Dtos/profile/StudentRequest.updateProfile.profile.dtos";
import { ICashMemoryService } from "../../Interfaces/ICash.interface";
import { IFileStorageService } from "../../Interfaces/IFileStorage.interface";
import { IPasswordService } from "../../Interfaces/IPassword.interface";
import { GetStudentQueriesHandlers } from "../../Querie/Handlers/GetStudentProfileQueriesHandler";
import { GetUserProfileQueries } from "../../Querie/Queries/GetUserProfileQueries";
import { IProfileStrategy } from "./IprofileStrategy.strategy";

export class StudentProfileStrategy implements IProfileStrategy {
  constructor(
    private readonly QueryHandler: GetStudentQueriesHandlers,
    // private readonly passwordService: IPasswordService,
    // private readonly fileService: IFileStorageService,
    private readonly cashService: ICashMemoryService
  ) {}

  public async UserProfile(userId: string): Promise<any> {
    const cashKey = `profile : ${userId}`;

    const cashData = await this.cashService.get<any>(cashKey);

    if (cashData) {
      return cashData;
    }

    const Queries = new GetUserProfileQueries(userId);
    const student = await this.QueryHandler.handle(Queries);

    if (!student) throw new Error("no user found !!");

    await this.cashService.set(cashKey, student, 36000);

    return student;
  }

  // public async UpdateUserProfile(
  //   userId: string,
  //   dto: StudentUpdateProfileRequest
  // ): Promise<any> {
  //   try {
  //     const user = await this.studentRep.findStudentById(userId);

  //     if (!user) throw new Error("no user found !!");

  //     const cashKey = `profile : ${userId}`;
  //     await this.cashService.delete(cashKey);

  //     if (dto.address) user.getUser().setAddress(dto.address);

  //     if (dto.dateOfBirth)
  //       user.getUser().updateDateOfBirth(new UserDateOfBirth(dto.dateOfBirth));

  //     if (dto.name) user.getUser().updateName(new UserName(dto.name));

  //     if (dto.phoneNumber)
  //       user.getUser().updatePhoneNumber(new userPhoneNumber(dto.phoneNumber));

  //     // FIXED LOGIC: Added 'else' to prevent double upload
  //     if (dto.photo) {
  //       const photo = user.getUser().getPhoto();
  //       if (photo) {
  //         let photoDoc: string = await this.fileService.update(
  //           dto.photo,
  //           photo
  //         );
  //         user.getUser().setPhoto(photoDoc);
  //       } else {
  //         let photoDoc: string = await this.fileService.upload(dto.photo);
  //         user.getUser().setPhoto(photoDoc);
  //       }
  //     }

  //     if (dto.newPassword && dto.oldPassword) {
  //       const validatePass = await this.passwordService.compare(
  //         dto.oldPassword,
  //         user.getUser().getPass()
  //       );

  //       if (!validatePass) throw new Error("old pass is not correct");
  //       const newPass = await this.passwordService.hash(dto.newPassword);

  //       if (
  //         await this.passwordService.compare(newPass, user.getUser().getPass())
  //       )
  //         throw new Error("you use this password before");
  //     }

  //     if (dto.major) {
  //       user.updateMajor(new StudentMajor(dto.major));
  //     }

  //     if (dto.gradateYear) {
  //       user.updateGraduateYear(new studentGraduateYear(dto.gradateYear));
  //     }

  //     if (dto.studentCardId) {
  //       user.updateStudentCardID(new StudentCard(dto.studentCardId));
  //     }

  //     if (dto.universityName) {
  //       user.updateUniversityName(new StudentUniversity(dto.universityName));
  //     }

  //     if (dto.verificationFile) {
  //       let verifiedFile: string = await this.fileService.upload(
  //         dto.verificationFile
  //       );

  //       user.updateVerificationDocument(new VerificationDocument(verifiedFile));
  //     }

  //     await this.studentRep.updateStudent(user);

  //     return {
  //       message: "student updated profile succfully ",
  //     };
  //   } catch (error: any) {
  //     console.error("fail to update student profile", error);
  //     throw error;
  //   }
  // }
}

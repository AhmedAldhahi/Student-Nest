import { RegisterStudentRequest } from "../../dtos/registeration/RegisterStudentRequest.dtos";
import { RegisterStudentRespone } from "../../dtos/registeration/RegisterStudentRespone.dtos";
import { OTP } from "../../../Core/value-object/OTP.vo";
import { v4 as uuidv4 } from "uuid";

import { IUnitOfWork } from "../../../Core/repositories/UnitOfWorkRepositories.repositories";
import { IPasswordService } from "../../interfaces/IPassword.interface";
import { IEmailService } from "../../interfaces/IEmail.interface";
import { IFileStorageService } from "../../interfaces/IFileStorage.interface";

import { UserEntity } from "../../../Core/entites/userEntity.entity";
import { UserName } from "../../../Core/value-object/UserName.vo";
import { UserDateOfBirth } from "../../../Core/value-object/UserDateOfBirth.vo";
import { userPhoneNumber } from "../../../Core/value-object/UserPhoneNumber.vo";
import { UserEmail } from "../../../Core/value-object/UserEmail.vo";
import { UserRole } from "../../../Core/enum/UserRole.enum";
import { StudentEntity } from "../../../Core/entites/studentEntity.entity";
import { StudentMajor } from "../../../Core/value-object/StudentMajor.vo";
import { studentGraduateYear } from "../../../Core/value-object/StudentGraduateYear.vo";
import { StudentCard } from "../../../Core/value-object/StudentCard.vo";
import { StudentUniversity } from "../../../Core/value-object/StudentUniversity.vo";
import { GovernmentID } from "../../../Core/value-object/UserGovId.vo";
import { VerificationDocument } from "../../../Core/value-object/VerficationDocument.vo";

export class RegisterStudentUseCase {
  constructor(
    private readonly unitOfWork: IUnitOfWork,
    private readonly passwordService: IPasswordService,
    private readonly emailService: IEmailService,
    private readonly fileService: IFileStorageService
  ) {}
  public async execute(
    dto: RegisterStudentRequest
  ): Promise<RegisterStudentRespone> {
    const otp = OTP.generate();
    const userId = uuidv4();
    const hashPass = await this.passwordService.hash(dto.password);

    const user = new UserEntity({
      userId: userId,
      password: hashPass,
      name: new UserName(dto.name),
      dateOfBirth: new UserDateOfBirth(dto.dateOfBirth),
      phoneNumber: new userPhoneNumber(dto.phoneNumber),
      email: new UserEmail(dto.email),
      role: UserRole.student,
      address: dto.address,
    });

    user.setOtpForEmail(otp);

    let verificationFilesUrl: string = await this.fileService.upload(
      dto.verificationFile
    );

    const student = new StudentEntity({
      user: user,
      major: new StudentMajor(dto.major),
      graduateYear: new studentGraduateYear(dto.gradateYear),
      studentCardId: new StudentCard(dto.studentCardId),
      universityName: new StudentUniversity(dto.universityName),
      userGovId: new GovernmentID(dto.studentGovId),
      validateStudentDocument: new VerificationDocument(
        verificationFilesUrl
      ),
    });

    await this.unitOfWork.startTransaction();

    try {
      // find if the user is excite
      const exciteUser = await this.unitOfWork.userRepo.findByEmail(dto.email);
      if (exciteUser) throw new Error("user with this email already exist");

      await this.unitOfWork.userRepo.addNewUser(user);
      await this.unitOfWork.studentRepo.createNewStudent(student);

      await this.unitOfWork.commitTransaction();
    } catch (err) {
      await this.unitOfWork.rollbackTransaction();
      console.log("Failed to register landlord!!", err);
      throw err;
    } finally {
      await this.unitOfWork.releaseTransaction(); // Always release here
    }

    // Send OTP email AFTER transaction
    try {
      await this.emailService.sendRegistrationEmail(
        user.getEmail(),
        otp.getValue()
      );
    } catch (emailErr) {
      console.log("email service failed!!", emailErr);
      // Email error should NOT rollback DB transaction
    }

    return {
      message:
        "Student registered successfully! Verify your email with the OTP.",
    };
  }
}

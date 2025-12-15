import { v4 as uuidv4 } from "uuid";
import { StudentAggregateRoot } from "../../../Domain/AggregatesRoot/studentEntity.entity";
import { UserEntity } from "../../../Domain/Entites/userEntity.entity";
import { UserRole } from "../../../Domain/Enum/UserRole.enum";
import { IUnitOfWork } from "../../../Domain/Repositories/UnitOfWorkRepositories.repositories";
import { OTP } from "../../../Domain/Value-Object/OTP.vo";
import { StudentCard } from "../../../Domain/Value-Object/StudentCard.vo";
import { studentGraduateYear } from "../../../Domain/Value-Object/StudentGraduateYear.vo";
import { StudentMajor } from "../../../Domain/Value-Object/StudentMajor.vo";
import { StudentUniversity } from "../../../Domain/Value-Object/StudentUniversity.vo";
import { UserDateOfBirth } from "../../../Domain/Value-Object/UserDateOfBirth.vo";
import { UserEmail } from "../../../Domain/Value-Object/UserEmail.vo";
import { GovernmentID } from "../../../Domain/Value-Object/UserGovId.vo";
import { UserName } from "../../../Domain/Value-Object/UserName.vo";
import { userPhoneNumber } from "../../../Domain/Value-Object/UserPhoneNumber.vo";
import { VerificationDocument } from "../../../Domain/Value-Object/VerficationDocument.vo";
import { RegisterStudentRequest } from "../../Dtos/registeration/RegisterStudentRequest.dtos";
import { RegisterStudentRespone } from "../../Dtos/registeration/RegisterStudentRespone.dtos";
import { IEmailService } from "../../Interfaces/IEmail.interface";
import { IFileStorageService } from "../../Interfaces/IFileStorage.interface";
import { IPasswordService } from "../../Interfaces/IPassword.interface";


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
      createdAt: new Date(),
    });

    user.setOtpForEmail(otp);

    let verificationFilesUrl: string = await this.fileService.upload(
      dto.verificationFile
    );

    const student = new StudentAggregateRoot({
      user: user,
      major: new StudentMajor(dto.major),
      graduateYear: new studentGraduateYear(dto.gradateYear),
      studentCardId: new StudentCard(dto.studentCardId),
      universityName: new StudentUniversity(dto.universityName),
      userGovId: new GovernmentID(dto.studentGovId),
      validateStudentDocument: new VerificationDocument(verificationFilesUrl),
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

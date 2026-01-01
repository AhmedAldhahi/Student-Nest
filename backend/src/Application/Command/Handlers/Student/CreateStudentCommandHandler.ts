import { v4 as uuidv4 } from "uuid";
import { UserEntity } from "../../../../Domain/Modules/Identity/Entities/userEntity.entity";
import { IReadUserRepositories } from "../../../../Domain/Modules/Identity/Repositories/ReadUserRepositories.repositories";
import { StudentAggregateRoot } from "../../../../Domain/Modules/Student/AgregatesRoot/studentEntity.entity";
import { StudentCard } from "../../../../Domain/Modules/Student/Value-Object/StudentCard.vo";
import { studentGraduateYear } from "../../../../Domain/Modules/Student/Value-Object/StudentGraduateYear.vo";
import { StudentMajor } from "../../../../Domain/Modules/Student/Value-Object/StudentMajor.vo";
import { StudentUniversity } from "../../../../Domain/Modules/Student/Value-Object/StudentUniversity.vo";
import { UserRole } from "../../../../Domain/Shared/Enum/UserRole.enum";
import { IUnitOfWork } from "../../../../Domain/Shared/Repositories/UnitOfWorkRepositories.repositories";
import { OTP } from "../../../../Domain/Shared/Value-Object/OTP.vo";
import { UserDateOfBirth } from "../../../../Domain/Shared/Value-Object/UserDateOfBirth.vo";
import { UserEmail } from "../../../../Domain/Shared/Value-Object/UserEmail.vo";
import { GovernmentID } from "../../../../Domain/Shared/Value-Object/UserGovId.vo";
import { UserName } from "../../../../Domain/Shared/Value-Object/UserName.vo";
import { userPhoneNumber } from "../../../../Domain/Shared/Value-Object/UserPhoneNumber.vo";
import { VerificationDocument } from "../../../../Domain/Shared/Value-Object/VerficationDocument.vo";
import { IFileStorageService } from "../../../Interfaces/IFileStorage.interface";
import { IPasswordService } from "../../../Interfaces/IPassword.interface";
import { ICommandHandlers } from "../../ICommandHandlers";
import { CreateStudentCommand } from "../../Commands/Student/CreateStudentCommand";

export class CreateStudentCommandHandler
  implements ICommandHandlers<CreateStudentCommand>
{
  constructor(
    private readonly unitOfWork: IUnitOfWork,
    private readonly passwordService: IPasswordService,
    private readonly fileService: IFileStorageService,
    private readonly readUserRepo: IReadUserRepositories
  ) {}

  public async handle(command: CreateStudentCommand): Promise<UserEntity> {
    const otp = OTP.generate();
    const userId = uuidv4();

    const hashPass = await this.passwordService.hash(command.password);

    const user = new UserEntity({
      userId: userId,
      password: hashPass,
      name: UserName.create(command.name),
      dateOfBirth: UserDateOfBirth.create(command.dateOfBirth),
      phoneNumber: userPhoneNumber.create(command.phoneNumber),
      email: UserEmail.create(command.email),
      role: UserRole.student,
      address: command.address,
      createdAt: new Date(),
    });

    user.setOtpForEmail(otp);

    let verificationFilesUrl: string = await this.fileService.upload(
      command.verificationFile
    );

    const student = new StudentAggregateRoot({
      userId: user.getUserId(),
      major: StudentMajor.create(command.major),
      graduateYear: studentGraduateYear.create(command.gradateYear),
      studentCardId: StudentCard.create(command.studentCardId),
      universityName: StudentUniversity.create(command.universityName),
      userGovId: GovernmentID.create(command.studentGovId),
      validateStudentDocument:
        VerificationDocument.create(verificationFilesUrl),
    });

    await this.unitOfWork.startTransaction();

    try {
      // find if the user is excite
      const exciteUser = await this.readUserRepo.findByEmail(command.email);

      if (exciteUser) {
        throw new Error("Email already taken.");
      }

      await this.unitOfWork.writeUserRepo.addNewUser(user);
      await this.unitOfWork.writeStudentRepo.addNewStudent(student);

      await this.unitOfWork.commitTransaction();

      return user;
    } catch (error: any) {
      await this.unitOfWork.rollbackTransaction();
      console.log("Failed to register student!!", error);
      throw error;
    } finally {
      await this.unitOfWork.releaseTransaction();
    }
  }
}

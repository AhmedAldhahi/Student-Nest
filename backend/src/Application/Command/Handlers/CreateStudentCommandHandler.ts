import { StudentAggregateRoot } from "../../../Domain/AggregatesRoot/studentEntity.entity";
import { UserEntity } from "../../../Domain/Entities/userEntity.entity";
import { UserRole } from "../../../Domain/Enum/UserRole.enum";
import { IReadUserRepositories } from "../../../Domain/Repositories/Read/ReadUserRepositories.repositories";
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
import { IFileStorageService } from "../../Interfaces/IFileStorage.interface";
import { IPasswordService } from "../../Interfaces/IPassword.interface";
import { CreateStudentCommand } from "../Commands/CreateStudentCommand";
import { ICommandHandlers } from "../ICommandHandlers";
import { v4 as uuidv4 } from "uuid";

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
      name: new UserName(command.name),
      dateOfBirth: new UserDateOfBirth(command.dateOfBirth),
      phoneNumber: new userPhoneNumber(command.phoneNumber),
      email: new UserEmail(command.email),
      role: UserRole.student,
      address: command.address,
      createdAt: new Date(),
    });

    user.setOtpForEmail(otp);

    let verificationFilesUrl: string = await this.fileService.upload(
      command.verificationFile
    );

    const student = new StudentAggregateRoot({
      user: user,
      major: new StudentMajor(command.major),
      graduateYear: new studentGraduateYear(command.gradateYear),
      studentCardId: new StudentCard(command.studentCardId),
      universityName: new StudentUniversity(command.universityName),
      userGovId: new GovernmentID(command.studentGovId),
      validateStudentDocument: new VerificationDocument(verificationFilesUrl),
    });

    await this.unitOfWork.startTransaction();

    try {
      // find if the user is excite
      const exciteUser = await this.readUserRepo.findByEmail(command.email);

      if (exciteUser) throw new Error("user with this email already exist");

      await this.unitOfWork.writeUserRepo.addNewUser(user);
      await this.unitOfWork.writeStudentRepo.addNewStudent(student);

      await this.unitOfWork.commitTransaction();

      return user;
    } catch (err) {
      await this.unitOfWork.rollbackTransaction();
      console.log("Failed to register landlord!!", err);
      throw err;
    } finally {
      await this.unitOfWork.releaseTransaction(); // Always release here
    }
  }
}

import { v4 as uuidv4 } from "uuid";
import { StudentAggregateRoot } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Aggregates/StudentAggregateRoot.entity";
import { UserEntity } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Entities/userEntity.entity";
import { UserRole } from "../../../../Domain/Shared/Enum/UserRole.enum";
import { IReadUserRepositories } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadUserRepositories.repositories";
import { OTP } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Value-Object/OTP.vo";
import { StudentCard } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Value-Object/StudentCard.vo";
import { studentGraduateYear } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Value-Object/StudentGraduateYear.vo";
import { StudentMajor } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Value-Object/StudentMajor.vo";
import { StudentUniversity } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Value-Object/StudentUniversity.vo";
import { UserDateOfBirth } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Value-Object/UserDateOfBirth.vo";
import { UserEmail } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Value-Object/UserEmail.vo";
import { GovernmentID } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Value-Object/UserGovId.vo";
import { UserName } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Value-Object/UserName.vo";
import { userPhoneNumber } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Value-Object/UserPhoneNumber.vo";
import { VerificationDocument } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Value-Object/VerficationDocument.vo";
import { IUnitOfWork } from "../../../../Domain/Shared/Repositories/UnitOfWorkRepositories.repositories";
import { IFileStorageService } from "../../../Interfaces/IFileStorage.interface";
import { IPasswordService } from "../../../Interfaces/IPassword.interface";
import { ICommandHandlers } from "../../Shared/abstraction/ICommandHandler";
import { CreateStudentCommand } from "../Command/CreateStudentCommand";
import { RegistrationStudentResponse } from "../Dto/Response/RegisterStudentResponse";
import { IEventBus } from "../../../../Domain/Shared/Event/IEventBus";
import { UserRegisteredEvent } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Events/UserRegisterdEvent.event";

export class CreateStudentCommandHandler implements ICommandHandlers<CreateStudentCommand> {
  constructor(
    private readonly unitOfWork: IUnitOfWork,
    private readonly passwordService: IPasswordService,
    private readonly fileService: IFileStorageService,
    private readonly readUserRepo: IReadUserRepositories,
    private readonly eventBus: IEventBus,
  ) {}

  public async handle(
    command: CreateStudentCommand,
  ): Promise<RegistrationStudentResponse> {
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
      command.verificationFile,
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
      roommateProfileStatus: false,
      enableWhatsapp: true,
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

      const event = new UserRegisteredEvent(
        user.getUserId(),
        command.email,
        command.name,
        otp.getValue(),
      );

      await this.eventBus.publish(event);

      return {
        message:
          "Student registered successfully! Verify your email with the OTP.",
      };
    } catch (error: any) {
      await this.unitOfWork.rollbackTransaction();
      throw error;
    } finally {
      await this.unitOfWork.releaseTransaction();
    }
  }
}

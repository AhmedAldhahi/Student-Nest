import { v4 as uuidv4 } from "uuid";
import { LandlordAggregateRoot } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Aggregates/landloardAggregateRoot.entity";
import { UserEntity } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Entities/userEntity.entity";
import { UserRole } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Enum/UserRole.enum";
import { IReadUserRepositories } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadUserRepositories.repositories";
import { OTP } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Value-Object/OTP.vo";
import { UserDateOfBirth } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Value-Object/UserDateOfBirth.vo";
import { UserEmail } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Value-Object/UserEmail.vo";
import { GovernmentID } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Value-Object/UserGovId.vo";
import { UserName } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Value-Object/UserName.vo";
import { userPhoneNumber } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Value-Object/UserPhoneNumber.vo";
import { VerificationDocument } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Value-Object/VerficationDocument.vo";
import { IUnitOfWork } from "../../../../Domain/Shared/Repositories/UnitOfWorkRepositories.repositories";
import { IFileStorageService } from "../../../Interfaces/IFileStorage.interface";
import { IPasswordService } from "../../../Interfaces/IPassword.interface";
import { CreateLandlordCommand } from "../Command/CreateLandlordCommand";
import { ICommandHandlers } from "../../Shared/abstraction/ICommandHandler";
import { RegistrationLandlordResponse } from "../Dto/Response/RegisterLandlordResponse";
import { IEventBus } from "../../../../Domain/Shared/Event/IEventBus";
import { UserRegisteredEvent } from "../../../../Domain/BoundedContexts/IdentityAndAccess/Events/UserRegisterdEvent.event";

export class CreateLandlordCommandHandler
  implements ICommandHandlers<CreateLandlordCommand>
{
  constructor(
    private readonly unitOfWork: IUnitOfWork,
    private readonly passwordService: IPasswordService,
    private readonly fileService: IFileStorageService,
    private readonly ReadUserRepo: IReadUserRepositories,
    private readonly eventBus: IEventBus
  ) {}

  public async handle(
    command: CreateLandlordCommand
  ): Promise<RegistrationLandlordResponse> {
    const otp = OTP.generate();

    // Create user entity here (before transaction)
    const userId = uuidv4();
    const hashedPassword = await this.passwordService.hash(command.password);

    const user = new UserEntity({
      userId: userId,
      password: hashedPassword,
      name: UserName.create(command.name),
      dateOfBirth: UserDateOfBirth.create(command.dateOfBirth),
      phoneNumber: userPhoneNumber.create(command.phoneNumber),
      email: UserEmail.create(command.email),
      role: UserRole.landlord,
      address: command.address,
      createdAt: new Date(),
    });

    // Set OTP to the entity
    user.setOtpForEmail(otp);

    let fileUrl: string = await this.fileService.upload(command.document);

    const landlord = new LandlordAggregateRoot({
      userId: user.getUserId(),
      cliQAccount: command.cliQAccount,
      landlordGovId: GovernmentID.create(command.LandlordGovId),
      document: VerificationDocument.create(fileUrl),
    });

    // Start Transaction
    await this.unitOfWork.startTransaction();

    try {
      const foundUser = await this.ReadUserRepo.findByEmail(command.email);
      if (foundUser !== null)
        throw new Error("user with this email already exist");

      await this.unitOfWork.writeUserRepo.addNewUser(user);
      await this.unitOfWork.writeLandlordRepo.addNewLandlord(landlord);

      await this.unitOfWork.commitTransaction();

      const event = new UserRegisteredEvent(
        user.getUserId(),
        command.email,
        command.name,
        otp.getValue()
      );

      await this.eventBus.publish(event);

      return {
        message:
          "Landlord registered successfully! Verify your email with the OTP.",
      };
    } catch (err) {
      await this.unitOfWork.rollbackTransaction();
      throw err;
    } finally {
      await this.unitOfWork.releaseTransaction(); // Always release here
    }
  }
}

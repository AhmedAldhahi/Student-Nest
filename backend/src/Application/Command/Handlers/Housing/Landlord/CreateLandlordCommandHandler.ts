import { v4 as uuidv4 } from "uuid";
import { LandlordAggregateRoot } from "../../../../../Domain/Modules/Housing/AgregateRoot/landloardEntity.entity";
import { UserEntity } from "../../../../../Domain/Modules/Identity/Entities/userEntity.entity";
import { UserRole } from "../../../../../Domain/Shared/Enum/UserRole.enum";
import { IReadUserRepositories } from "../../../../../Domain/Modules/Identity/Repositories/ReadUserRepositories.repositories";
import { IUnitOfWork } from "../../../../../Domain/Shared/Repositories/UnitOfWorkRepositories.repositories";
import { OTP } from "../../../../../Domain/Shared/Value-Object/OTP.vo";
import { UserEmail } from "../../../../../Domain/Shared/Value-Object/UserEmail.vo";
import { GovernmentID } from "../../../../../Domain/Shared/Value-Object/UserGovId.vo";
import { UserName } from "../../../../../Domain/Shared/Value-Object/UserName.vo";
import { userPhoneNumber } from "../../../../../Domain/Shared/Value-Object/UserPhoneNumber.vo";
import { VerificationDocument } from "../../../../../Domain/Shared/Value-Object/VerficationDocument.vo";
import { IFileStorageService } from "../../../../Interfaces/IFileStorage.interface";
import { IPasswordService } from "../../../../Interfaces/IPassword.interface";
import { ICommandHandlers } from "../../../ICommandHandlers";
import { UserDateOfBirth } from "../../../../../Domain/Shared/Value-Object/UserDateOfBirth.vo";
import { CreateLandlordCommand } from "../../../Commands/Landlord/CreateLandlordCommand";
export class CreateLandlordCommandHandler
  implements ICommandHandlers<CreateLandlordCommand>
{
  constructor(
    private readonly unitOfWork: IUnitOfWork,
    private readonly passwordService: IPasswordService,
    private readonly fileService: IFileStorageService,
    private readonly ReadUserRepo: IReadUserRepositories
  ) {}

  public async handle(command: CreateLandlordCommand): Promise<UserEntity> {
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
      if (foundUser) throw new Error("user with this email already exist");

      await this.unitOfWork.writeUserRepo.addNewUser(user);
      await this.unitOfWork.writeLandlordRepo.addNewLandlord(landlord);

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

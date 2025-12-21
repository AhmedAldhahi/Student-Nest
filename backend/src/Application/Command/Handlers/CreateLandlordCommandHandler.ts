import { v4 as uuidv4 } from "uuid";
import { LandlordAggregateRoot } from "../../../Domain/AggregatesRoot/landloardEntity.entity";
import { UserEntity } from "../../../Domain/Entities/userEntity.entity";
import { UserRole } from "../../../Domain/Enum/UserRole.enum";
import { IReadUserRepositories } from "../../../Domain/Repositories/Read/ReadUserRepositories.repositories";
import { IUnitOfWork } from "../../../Domain/Repositories/UnitOfWorkRepositories.repositories";
import { OTP } from "../../../Domain/Value-Object/OTP.vo";
import { UserDateOfBirth } from "../../../Domain/Value-Object/UserDateOfBirth.vo";
import { UserEmail } from "../../../Domain/Value-Object/UserEmail.vo";
import { GovernmentID } from "../../../Domain/Value-Object/UserGovId.vo";
import { UserName } from "../../../Domain/Value-Object/UserName.vo";
import { userPhoneNumber } from "../../../Domain/Value-Object/UserPhoneNumber.vo";
import { VerificationDocument } from "../../../Domain/Value-Object/VerficationDocument.vo";
import { IFileStorageService } from "../../Interfaces/IFileStorage.interface";
import { IPasswordService } from "../../Interfaces/IPassword.interface";
import { CreateLandlordCommand } from "../Commands/CreateLandlordCommand";
import { ICommandHandlers } from "../ICommandHandlers";

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
      role: UserRole.landloard,
      address: command.address,
      createdAt: new Date(),
    });

    // Set OTP to the entity
    user.setOtpForEmail(otp);

    let fileUrl: string = await this.fileService.upload(command.document);

    const landlord = new LandlordAggregateRoot({
      user: user,
      cliQAccount: command.cliQAccount,
      landlordGovId: GovernmentID.create(command.LandloardGovId),
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

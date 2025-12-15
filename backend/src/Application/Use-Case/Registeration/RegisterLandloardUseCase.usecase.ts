
import { v4 as uuidv4 } from "uuid";
import { LandlordAggregateRoot } from "../../../Domain/AggregatesRoot/landloardEntity.entity";
import { UserEntity } from "../../../Domain/Entites/userEntity.entity";
import { UserRole } from "../../../Domain/Enum/UserRole.enum";
import { IUnitOfWork } from "../../../Domain/Repositories/UnitOfWorkRepositories.repositories";
import { OTP } from "../../../Domain/Value-Object/OTP.vo";
import { UserDateOfBirth } from "../../../Domain/Value-Object/UserDateOfBirth.vo";
import { UserEmail } from "../../../Domain/Value-Object/UserEmail.vo";
import { GovernmentID } from "../../../Domain/Value-Object/UserGovId.vo";
import { UserName } from "../../../Domain/Value-Object/UserName.vo";
import { userPhoneNumber } from "../../../Domain/Value-Object/UserPhoneNumber.vo";
import { VerificationDocument } from "../../../Domain/Value-Object/VerficationDocument.vo";
import { RegisterLandloardRequest } from "../../Dtos/registeration/RegisterLandloardRequest.dtos";
import { RegisterLandloardRespone } from "../../Dtos/registeration/RegisterLandloardRespone.dtos";
import { IEmailService } from "../../Interfaces/IEmail.interface";
import { IFileStorageService } from "../../Interfaces/IFileStorage.interface";
import { IPasswordService } from "../../Interfaces/IPassword.interface";


export class RegisterLandloardUseCase {
  constructor(
    private readonly unitOfWork: IUnitOfWork,
    private readonly passwordService: IPasswordService,
    private readonly emailService: IEmailService,
    private readonly fileService: IFileStorageService
  ) {}

  public async execute(
    dto: RegisterLandloardRequest
  ): Promise<RegisterLandloardRespone> {
    const otp = OTP.generate();

    // Create user entity here (before transaction)
    const userId = uuidv4();
    const hashedPassword = await this.passwordService.hash(dto.password);

    const user = new UserEntity({
      userId: userId,
      password: hashedPassword,
      name: new UserName(dto.name),
      dateOfBirth: new UserDateOfBirth(dto.dateOfBirth),
      phoneNumber: new userPhoneNumber(dto.phoneNumber),
      email: new UserEmail(dto.email),
      role: UserRole.landloard,
      address: dto.address,
      createdAt: new Date(),
    });

    // Set OTP to the entity
    user.setOtpForEmail(otp);

    let fileUrl: string = await this.fileService.upload(dto.document);

    const landlord = new LandlordAggregateRoot({
      user: user,
      cliQAccount: dto.cliQAccount,
      landlordGovId: new GovernmentID(dto.LandloardGovId),
      document: new VerificationDocument(fileUrl),
    });

    // Start Transaction
    await this.unitOfWork.startTransaction();

    try {
      const foundUser = await this.unitOfWork.userRepo.findByEmail(dto.email);
      if (foundUser) throw new Error("user with this email already exist");

      await this.unitOfWork.userRepo.addNewUser(user);
      await this.unitOfWork.landlordRepo.createNewLandlord(landlord);

      await this.unitOfWork.commitTransaction(); // Commit only
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
        "Landlord registered successfully! Verify your email with the OTP.",
    };
  }
}

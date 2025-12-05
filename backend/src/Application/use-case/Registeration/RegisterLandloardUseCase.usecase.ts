import { IPasswordService } from "../../interfaces/IPassword.interface";
import { IEmailService } from "../../interfaces/IEmail.interface";

import { RegisterLandloardRespone } from "../../dtos/registeration/RegisterLandloardRespone.dtos";
import { RegisterLandloardRequest } from "../../dtos/registeration/RegisterLandloardRequest.dtos";
import { v4 as uuidv4 } from "uuid";

import { OTP } from "../../../Core/value-object/OTP.vo";
import { IUnitOfWork } from "../../../Core/repositories/UnitOfWorkRepositories.repositories";

import { UserEntity } from "../../../Core/entites/userEntity.entity";
import { UserName } from "../../../Core/value-object/UserName.vo";
import { UserDateOfBirth } from "../../../Core/value-object/UserDateOfBirth.vo";
import { userPhoneNumber } from "../../../Core/value-object/UserPhoneNumber.vo";
import { UserEmail } from "../../../Core/value-object/UserEmail.vo";
import { UserRole } from "../../../Core/enum/UserRole.enum";

import { LandlordEntity } from "../../../Core/entites/landloardEntity.entity";
import { GovernmentID } from "../../../Core/value-object/UserGovId.vo";
import { VerificationDocument } from "../../../Core/value-object/VerficationDocument.vo";
import { IFileStorageService } from "../../interfaces/IFileStorage.interface";

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
    });

    // Set OTP to the entity
    user.setOtpForEmail(otp);

    let fileUrl: string = await this.fileService.upload(dto.document);

    const landlord = new LandlordEntity({
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

import { IUnitOfWorkRepository } from "../../Core/repositories/UnitOfWorkRepository.repository";
import { IPasswordService } from "../../Core/services/IPasswordService.service";
import { LandloardBuilder } from "../builder/landloardBuilder.build";
import { UserExictException } from "../Error/UserExictException.error";
import { RegisterLandloardRequest } from "../dtos/RegisterLandloardRequest.dtos";
import { RegisterLandloardRespone } from "../dtos/RegisterLandloardRespone.dtos";
import { v4 as uuidv4 } from "uuid";
import { OTP } from "../../Core/value-object/OTP.ValueObject";
import { IEmailService } from "../../Core/services/IEmailService.service";

export class RegisterLandloardUseCase {
  constructor(
    private readonly unitOfWork: IUnitOfWorkRepository,
    private readonly passwordService: IPasswordService,
    private readonly landloardBuilder: LandloardBuilder,
    private readonly emailService: IEmailService
  ) {}

  public async execute(
    dto: RegisterLandloardRequest
  ): Promise<RegisterLandloardRespone> {
    await this.unitOfWork.startTransaction();
    const otp = OTP.generate();

    try {
      // find if the user is excit
      const excitUser = await this.unitOfWork.LandloardReposotries.findByEmail(
        dto.email
      );
      if (excitUser) {
        throw new UserExictException();
      }

      const hashPassword = await this.passwordService.hash(dto.password);
      const generatedUserId = uuidv4();

      const userBuilder = this.landloardBuilder
        .buildUserId(generatedUserId)
        .buildRole(dto.role)
        .buildEmail(dto.email)
        .buildName(dto.name)
        .buildDateOfBirth(dto.dateOfBirth)
        .buildPhoneNumber(dto.phoneNumber)
        .buildHash(hashPassword)
        .buildCliqAccount(dto.cliQAccount)
        .buildLandloardGovId(dto.LandloardGovId);

      if (dto.address) {
        userBuilder.buildAddress(dto.address);
      }

      if (!dto.LandloardGovId || !dto.cliQAccount) {
        throw new Error(
          "Landloard  role requires 'cliQ' and 'Landloard Gov Id'."
        );
      }

      // concreate class ready now
      const user = userBuilder.build();
      user.setOtp(otp);
      console.log(otp);

      // if select address add it if not do not add it

      await this.unitOfWork.LandloardReposotries.save(user);
      await this.emailService.sendRegistrationEmail(
        user.getEmail(),
        otp.getValue()
      );
      await this.unitOfWork.commit();

      return {
        message: "user regster scussful! verfied you email otp ",
      };
    } catch (err) {
      // <-- 'err' is of type 'unknown'

      let errorMessage = "An unknown error occurred";

      // 1. Check if 'err' is an Error object
      if (err instanceof Error) {
        // 2. Now it's safe to access err.message
        errorMessage = err.message;
      }

      // 3. Log the safe error message
      console.error("Failed to create user. Reason:", errorMessage);

      await this.unitOfWork.rollBack();
      throw err; // Re-throw the original error
    }
  }
}

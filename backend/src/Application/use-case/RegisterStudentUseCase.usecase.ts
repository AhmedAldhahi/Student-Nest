import { IUnitOfWorkRepository } from "../../Core/repositories/UnitOfWorkRepository.repository";
import { IPasswordService } from "../../Core/services/IPasswordService.service";
import { StudentBuilder } from "../builder/studentBuilder.build";
import { UserExictException } from "../Error/UserExictException.error";
import { RegisterStudentRequest } from "../dtos/RegisterStudentRequest.dtos";
import { RegisterStudentRespone } from "../dtos/RegisterStudentRespone.dtos";
import { IEmailService } from "../../Core/services/IEmailService.service";
import { OTP } from "../../Core/value-object/OTP.vo";
import { v4 as uuidv4 } from "uuid";

export class RegisterStudentUseCase {
  constructor(
    private readonly unitOfWork: IUnitOfWorkRepository,
    private readonly passwordService: IPasswordService,
    private readonly studentBuilder: StudentBuilder,
    private readonly emailService: IEmailService
  ) {}
  public async execute(
    dto: RegisterStudentRequest
  ): Promise<RegisterStudentRespone> {
    await this.unitOfWork.startTransaction();
    const otp = OTP.generate();

    try {
      // find if the user is excit
      const excitUser = await this.unitOfWork.StudentRepostoies.findByEmail(
        dto.email
      );
      if (excitUser) {
        throw new UserExictException();
      }

      const hashPassword = await this.passwordService.hash(dto.password);
      const generatedUserId = uuidv4();

      const studentBuilder = this.studentBuilder
        .buildUserId(generatedUserId)
        .buildRole(dto.role)
        .buildEmail(dto.email)
        .buildName(dto.name)
        .buildDateOfBirth(dto.dateOfBirth)
        .buildPhoneNumber(dto.phoneNumber)
        .buildHash(hashPassword)
        .buildMajor(dto.major)
        .buildUnversityName(dto.unversityName)
        .buildGraduateYear(dto.graduatYear)
        .buildStudentCardId(dto.studentCardId)
        .buildStudentGovId(dto.studentGovId);

      if (dto.address) {
        studentBuilder.buildAddress(dto.address);
      }

      if (!dto.major || !dto.unversityName) {
        throw new Error("Student role requires 'major' (and 'university'.");
      }

      // concrete class ready now
      const user = studentBuilder.build();
      user.setOtp(otp);

      // now set otp that will send to email

      // if select address add it if not do not add it

      await this.unitOfWork.StudentRepostoies.save(user);
      await this.emailService.sendRegistrationEmail(
        user.getEmail(),
        otp.getValue()
      );
      await this.unitOfWork.commit();

      return {
        message: "user register scussful! verfied you email otp ",
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

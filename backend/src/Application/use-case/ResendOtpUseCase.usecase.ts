import { IEmailService } from "../../Core/services/IEmailService.service";
import { OTP } from "../../Core/value-object/OTP.vo";
import { ResendOtpRequest } from "../dtos/ResendOtpRequest.dto";
import { ResendOtpRespone } from "../dtos/ResendOtpRespone.dto";
import { IUnitOfWorkRepository } from "../../Core/repositories/UnitOfWorkRepository.repository";
import { NoUserExistException } from "../Error/NoUseExictException.error";

export class ResendOtpUseCase {
  constructor(
    private readonly emailService: IEmailService,
    private readonly unitOfWork: IUnitOfWorkRepository
  ) {}

  // process:
  // 1- search for user email if excite or not
  // 2- if not throw error
  // 3- if excite send otp to this email
  // 4- end

  public async excute(dto: ResendOtpRequest): Promise<ResendOtpRespone> {
    await this.unitOfWork.startTransaction();
    const otp = OTP.generate();

    const otpvalue = otp.getValue();
    const otpExpired = otp.getExpiresAt();

    try {
      const user = await this.unitOfWork.userRepotories.findByEmail(dto.email);
      if (!user) {
        throw new NoUserExistException();
      }

      // Update domain object
      user.setOtp(otp);
      user.setOtpExpired(otpExpired);

      // Persist changes
      await this.unitOfWork.userRepotories.save(user);
      console.log(user.getPassword());

      // Send OTP email after saving to DB
      await this.emailService.resendOtpEmail(dto.email, otpvalue);

      await this.unitOfWork.commit();

      return {
        message: "OTP has been resent successfully. Check your email.",
      };
    } catch (err: any) {
      await this.unitOfWork.rollBack();
      console.error("Failed to resend OTP code:", err.message);
      throw err;
    }
  }
}

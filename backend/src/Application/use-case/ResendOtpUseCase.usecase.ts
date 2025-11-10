import { IEmailService } from "../../Core/services/IEmailService.service";
import { OTP } from "../../Core/value-object/OTP.ValueObject";
import { ResendOtpRequest } from "../dtos/ResendOtpRequest.dto";
import { ResendOtpRespone } from "../dtos/ResendOtpRespone.dto";
import { IUnitOfWorkRepository } from "../../Core/repositories/UnitOfWorkRepository.repository";
import { UserExictException } from "../Error/UserExictException.error";

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
    try {
      const user = await this.unitOfWork.userRepotories.findByEmail(dto.email);
      if (!user) {
        throw new UserExictException("the user email not found !!");
      }

      await this.emailService.resendOtpEmail(dto.email, otp.getValue());
      await this.unitOfWork.commit();

      return {
        message: "otp been send to the email successful  verified you email !!",
      };
    } catch (err: any) {
      await this.unitOfWork.rollBack();
      console.error("Failed to resend OTP code:", err.message);
      throw err;
    }
  }
}

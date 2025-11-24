import { IEmailService } from "../interfaces/IEmail.interface";
import { OTP } from "../../Core/value-object/OTP.vo";
import { ResendOtpRequest } from "../dtos/ResendOtpRequest.dto";
import { ResendOtpRespone } from "../dtos/ResendOtpRespone.dto";
import { IUnitOfWork } from "../../Core/repositories/UnitOfWorkRepositories.repositories";

export class ResendOtpUseCase {
  constructor(
    private readonly emailService: IEmailService,
    private readonly unitOfWork: IUnitOfWork
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

    try {
      const user = await this.unitOfWork.userRepo.findByEmail(dto.email);
      if (!user) {
        throw new Error("no user been found !!");
      } 

      if (user.getVerifiedEmail()) {
        throw new Error ("this email is been verified !!")
      }

      user.setOtpForEmail(otp); 
      console.log(user.getOtpForEmail(), user.getOtpExpiredForEmail());
      

      await this.unitOfWork.userRepo.addNewUser(user);
      
      //console.log(user.getPassword());

      // Send OTP email after saving to DB
      await this.emailService.resendOtpEmail(dto.email, otpvalue);

      await this.unitOfWork.commitTransaction();

      return {
        message: "OTP has been resent successfully. Check your email.",
      };
    } catch (err: any) {
      await this.unitOfWork.rollbackTransaction();
      console.error("Failed to resend OTP code:", err.message);
      throw err;
    }
  }
}

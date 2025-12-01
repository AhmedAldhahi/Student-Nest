import { IUnitOfWork } from "../../../../Core/repositories/UnitOfWorkRepositories.repositories";
import { OTP } from "../../../../Core/value-object/OTP.vo";
import { ResendOtpRequest } from "../../../dtos/password-recover/ResendOtpRequest.dto";
import { ResendOtpRespone } from "../../../dtos/password-recover/ResendOtpRespone.dto";
import { IEmailService } from "../../../interfaces/IEmail.interface";

export class ResendOtpForgetPasswordUseCase {
  constructor(
    private readonly emailService: IEmailService,
    private readonly unitOfWork: IUnitOfWork
  ) {}

  public async excute(dto: ResendOtpRequest): Promise<ResendOtpRespone> {
    await this.unitOfWork.startTransaction();  
    
    const otp = OTP.generate();

    const otpvalue = otp.getValue();

    try {
      const user = await this.unitOfWork.userRepo.findByEmail(dto.email);
      if (!user) {
        throw new Error("no user been found !!");
      } 
      user.resetVerifiedPassword(); 

      user.setOTPForResetPassword(otp);
      console.log(
        user.getOTPForResetPassword(),
        user.getOTPExpiredDateForResetPassword()
      );

  
      
      await this.unitOfWork.userRepo.addNewUser(user);

      // Send OTP email after saving to DB
      await this.emailService.sendPasswordResetEmail(dto.email, otpvalue);

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

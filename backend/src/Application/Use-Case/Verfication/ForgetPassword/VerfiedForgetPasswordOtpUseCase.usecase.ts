import { VerifiedOTpRequest } from "../../../Dtos/Email-verfied/VerfiedOtpRequest.dto";
import { IUnitOfWork } from "../../../../Domain/Repositories/UnitOfWorkRepositories.repositories";

export class VerifiedForgetPasswordOtpUseCase {
  constructor(
    private readonly unitOfrWork: IUnitOfWork
  ) {}

  public async execute(dto: VerifiedOTpRequest) {
    await this.unitOfrWork.startTransaction();

    try {
      const user = await this.unitOfrWork.userRepo.findByEmail(dto.email);
      if (!user) throw new Error("No user found for this email.");

      // Check if already verified
      if (user.getVerifiedResetPassword()) {
        throw new Error("User already verified.");
      } 

      console.log(user.getVerifiedResetPassword());

      // Get OTP and expiration
      const otp = user.getOTPForResetPassword();
      const otpExpired = user.getOTPExpiredDateForResetPassword();

      if (!otp || !otpExpired) throw new Error("OTP not sent for this email.");
      if (new Date() > otpExpired) throw new Error("OTP expired. Request a new one.");
      if (otp !== dto.otpCode) throw new Error("Invalid OTP code.");

      // Mark as verified and clear OTP
      user.verifyResetPassword(); 

      user.clearResetPasswordOTP();
      

      await this.unitOfrWork.userRepo.addNewUser(user); // save updated user
      await this.unitOfrWork.commitTransaction();


      return {
        message: "OTP verified successfully, update your password now ",
      };
    } catch (err) {
      await this.unitOfrWork.rollbackTransaction();
      console.error("OTP verification failed:", err);
      if (err instanceof Error) throw err;
      throw new Error("Failed to verify OTP. Please try again.");
    } finally {
      await this.unitOfrWork.releaseTransaction();
    }
  }
}

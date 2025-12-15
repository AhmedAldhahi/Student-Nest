import { VerifiedOTpRequest } from "../../../Dtos/Email-verfied/VerfiedOtpRequest.dto";
import { IUnitOfWork } from "../../../../Domain/Repositories/UnitOfWorkRepositories.repositories";
import { ITokenPayload, ITokenService } from "../../../Interfaces/IToken.interface";
import { VerifiedOTpResponse } from "../../../Dtos/Email-verfied/VerifiedOtpRespone.dto";

export class VerifiedOtpUseCase {
  constructor(
    private readonly tokenService: ITokenService,
    private readonly unitOfrWork: IUnitOfWork
  ) {}

  public async execute(dto: VerifiedOTpRequest): Promise<VerifiedOTpResponse> {
    await this.unitOfrWork.startTransaction();

    try {
      const user = await this.unitOfrWork.userRepo.findByEmail(dto.email);
      if (!user) throw new Error("No user found for this email.");

      // Check if already verified
      if (user.getVerifiedEmail()) {
        throw new Error("User already verified.");
      } 

      console.log(user.getVerifiedEmail());

      // Get OTP and expiration
      const otp = user.getOtpForEmail();
      const otpExpired = user.getOtpExpiredForEmail();

      if (!otp || !otpExpired) throw new Error("OTP not sent for this email.");
      if (new Date() > otpExpired) throw new Error("OTP expired. Request a new one.");
      if (otp !== dto.otpCode) throw new Error("Invalid OTP code.");

      // Mark as verified and clear OTP
      user.verifiedEmail();

      user.clearEmailOTP();
      

      await this.unitOfrWork.userRepo.addNewUser(user); // save updated user
      await this.unitOfrWork.commitTransaction();

      // Generate token
      const payload: ITokenPayload = { userId: user.getUserId() };
      const token = this.tokenService.generateAccessToken(payload);

      return {
        message: "Email verified successfully.",
        token,
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

import { VerifiedOTpRequest } from "../dtos/VerfiedOtpRequest.dto";
import { IUnitOfWorkRepository } from "../../Core/repositories/UnitOfWorkRepository.repository";
import { UserExictException } from "../Error/UserExictException.error";
import {
  ITokenPayload,
  ITokenService,
} from "../../Core/services/ITokenService.service";
import { VerifiedOTpResponse } from "../dtos/VerifiedOtpRespone.dto";

export class VerifiedOtpUseCase {
  // process
  /*
    1- check if the user exit 
    2- compare otp expired date 
    3- if failed resend otp 
    4- if pass compare user otp with our otp in db 
    5- if pass varied and send token , refresh token
    6- if failed return result 
    */
  constructor(
    private readonly tokenService: ITokenService,
    private readonly unitOfrWork: IUnitOfWorkRepository
  ) {}

  public async execute(dto: VerifiedOTpRequest): Promise<VerifiedOTpResponse> {
    await this.unitOfrWork.startTransaction();
    try {
      const user = await this.unitOfrWork.userRepotories.findByEmail(dto.email);
      if (!user) {
        throw new UserExictException("no user been found !!");
      }

      // This check will now work correctly thanks to the mapper fix
      if (user.getVerfiedEmail()) throw new Error("user already verified !!");

      const otp = user.getOtpCode();
      const otpExpired = user.getOtpExpired();

      if (!otp || !otpExpired)
        throw new Error("no otp been send for this email !");
      if (new Date() > otpExpired)
        throw new Error("otp expired date recreate new one !!");
      if (otp !== dto.otpCode) throw new Error("invalid otp code !!");

      console.log(user.getOtpCode());
      console.log(user.getOtpExpired());
      console.log("Before:", user.getVerfiedEmail());

      user.setVerfiedEmail(); // This sets it to true
      user.clearOtp(); // <-- The OTP is set to null HERE.

      console.log("After:", user.getVerfiedEmail());
      //console.log("After OTP:", user.getOtpCode());
      
      
      await this.unitOfrWork.userRepotories.save(user);
      await this.unitOfrWork.commit();

      const payload: ITokenPayload = {
        userId: user.getUserId(),
      };
      const Token = this.tokenService.generateAccessToken(payload);
      return {
        message: "email verified scussfuly",
        token: Token,
      };
    } catch (err) {
      // Always roll back on any error
      await this.unitOfrWork.rollBack();
      console.error("Failed to verify OTP:", err);

      // Check for your *specific* known errors first
      if (err instanceof UserExictException) {
        // You already have a good message, just throw it
        throw err;
      }

      // --- THIS IS THE FIX for Bug 2 ---
      // We've added "user already verified !!" to the list
      // of "safe" errors that can be shown to the client.
      if (
        err instanceof Error &&
        (err.message.startsWith("no otp been send") ||
          err.message.startsWith("otp expired date") ||
          err.message.startsWith("invalid otp code") ||
          err.message.startsWith("user already verified !!"))
      ) {
        // These are client errors, just throw them
        throw err;
      }
      // --- End of Fix ---

      // If it's an *unknown* error (like a database crash),
      // THEN show a generic message.
      throw new Error("Failed to verify OTP, please try again later.");
    }
  }
}

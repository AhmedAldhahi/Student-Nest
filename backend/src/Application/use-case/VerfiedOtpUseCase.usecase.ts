import { VerifiedOTpRequest } from "../dtos/VerfiedOtpRequest.dto";
import { IUnitOfWorkRepository } from "../../Core/repositories/UnitOfWorkRepository.repository";
import { UserExictException } from "../Error/UserExictException.error";
import {
  ITokenPayload,
  ITokenService,
} from "../../Core/services/ITokenService.service";
import { VerifiedOTpResponse } from "../dtos/VerifiedOtpRespone.dto";

export class VerifiedOtpUseCase {
  // dto
  // email, otp, otpexpired

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
    private readonly unitorWork: IUnitOfWorkRepository
  ) {}

  public async execute(dto: VerifiedOTpRequest): Promise<VerifiedOTpResponse> {
    await this.unitorWork.startTransaction();
    try {
      const user = await this.unitorWork.userRepotories.findByEmail(dto.email);
      if (!user) {
        throw new UserExictException("no user been found !!");
      }

      const otp = user.getOtpCode();
      const otpExpired = user.getOtpExpired();

      if (!otp || !otpExpired)
        throw new Error("no otp been send for this email !");

      if (new Date() > otpExpired)
        throw new Error("otp expired date recreate new one !!");

      if (otp !== dto.otpCode) throw new Error("invalid otp code !!");

      user.setVerfiedEmail();
      user.clearOtp();

      await this.unitorWork.userRepotories.save(user);

      // generate token and reresh token
      // token => payload

      const payload: ITokenPayload = {
        userId: user.getUserId(),
      };

      const Token = this.tokenService.generateAccessToken(payload);

      await this.unitorWork.commit();

      return {
        message: "email verified scussfuly",
        token: Token,
      };
    } catch (err) {
      // Always roll back on any error
      await this.unitorWork.rollBack();

      console.error("Failed to verify OTP:", err);

      // Check for your *specific* known errors first
      if (err instanceof UserExictException) {
        // You already have a good message, just throw it
        throw err;
      }

      // Check for the other simple errors
      if (
        err instanceof Error &&
        (err.message.startsWith("no otp been send") ||
          err.message.startsWith("otp expired date") ||
          err.message.startsWith("invalid otp code"))
      ) {
        // These are client errors, just throw them
        throw err;
      }

      // If it's an *unknown* error (like a database crash),
      // THEN show a generic message.
      throw new Error("Failed to verify OTP, please try again later.");
    }
  }
}

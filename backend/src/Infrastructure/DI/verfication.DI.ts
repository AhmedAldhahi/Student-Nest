import { VerifiedOtpUseCase } from "../../Application/use-case/Verfication/OTP/VerfiedOtpUseCase.usecase";
import { JwtTokenService } from "../services/security/TokenService.service";
import { UnitOfWork } from "../repositories/unitOfWork.repositories";
import { MailtrapService } from "../services/email/MailtrapService.service";
import { ForgetPasswordUseCase } from "../../Application/use-case/Verfication/ForgetPassword/ForgetPasswordUseCase.usecase";
import { BcryptPasswordHasher } from "../services/security/BcryptPasswordHasher.service";
import { VerifiedForgetPasswordOtpUseCase } from "../../Application/use-case/Verfication/ForgetPassword/VerfiedForgetPasswordOtpUseCase.usecase";
import { ResendOtpUseCase } from "../../Application/use-case/Verfication/OTP/ResendOtpUseCase.usecase";
import { ResendOtpForgetPasswordUseCase } from "../../Application/use-case/Verfication/ForgetPassword/ResendOtpForgetPasswordUseCase.usecase";

export function makeVerifiedEmailOTP(): VerifiedOtpUseCase {
  const unitOfrWork = new UnitOfWork();
  const token = new JwtTokenService();

  return new VerifiedOtpUseCase(token, unitOfrWork);
}

export function makeResendEmailOTP(): ResendOtpUseCase {
  const unitOfrWork = new UnitOfWork();
  const emailService = new MailtrapService();

  return new ResendOtpUseCase(emailService, unitOfrWork);
}

export function makeUpdateForgetPass(): ForgetPasswordUseCase {
  const unitOfrWork = new UnitOfWork();
  const token = new JwtTokenService();
  const passwordService = new BcryptPasswordHasher();

  return new ForgetPasswordUseCase(unitOfrWork, token, passwordService);
}

export function makeResendForgetPassword(): ResendOtpForgetPasswordUseCase {
  const unitOfrWork = new UnitOfWork();
  const emailService = new MailtrapService();


  return new ResendOtpForgetPasswordUseCase(emailService, unitOfrWork);
}

export function makeVerfiedForgetPasswordOTP(): VerifiedForgetPasswordOtpUseCase {
  const unitOfWork = new UnitOfWork();

  return new VerifiedForgetPasswordOtpUseCase(unitOfWork);
}

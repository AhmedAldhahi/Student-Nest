import { VerifiedOtpUseCase } from "../../Application/use-case/VerfiedOtpUseCase.usecase";
import { JwtTokenService } from "../services/TokenService.service";
import { UnitOfWork } from "../database/repositories/unitOfWork.repositories";
//import { ResendOtpUseCase } from "../../Application/use-case/ResendOtpUseCase.usecase";
import { NodemailerService } from "../services/email/NodemailerService.service";
import {MailerSendAdapter} from "../services/email/MailresenderService.service"
import { ForgetPasswordUseCase } from "../../Application/use-case/ForgetPasswordUseCase.usecase";
import { BcryptPasswordHasher } from "../services/BcryptPasswordHasher.service";
import { ResendOtpForgetPasswordUseCase } from "../../Application/use-case/ResendOtpForgetPasswordUseCase.usecase";
import { VerifiedForgetPasswordOtpUseCase } from "../../Application/use-case/VerfiedForgetPasswordOtpUseCase.usecase";
import { ResendOtpUseCase } from "../../Application/use-case/ResendOtpUseCase.usecase";

export function makeVerifiedEmailOTP(): VerifiedOtpUseCase {
  const unitOfrWork = new UnitOfWork();
  const token = new JwtTokenService();

  return new VerifiedOtpUseCase(token, unitOfrWork);
}

export function makeResendEmailOTP(): ResendOtpUseCase {
  const unitOfrWork = new UnitOfWork();
  const emailService = new NodemailerService();

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
  //const emailService = new NodemailerService();
  const emailService = new MailerSendAdapter();


  return new ResendOtpForgetPasswordUseCase(emailService, unitOfrWork);
}

export function makeVerfiedForgetPasswordOTP(): VerifiedForgetPasswordOtpUseCase {
  const unitOfWork = new UnitOfWork();

  return new VerifiedForgetPasswordOtpUseCase(unitOfWork);
}

import { VerifiedOtpUseCase } from "../../Application/use-case/VerfiedOtpUseCase.usecase";
import { JwtTokenService } from "../services/TokenService.service";
import { UnitOfWork } from "../database/repositories/unitOfWork.repositories";
import { ResendOtpUseCase } from "../../Application/use-case/ResendOtpUseCase.usecase";
import { NodemailerService } from "../services/email/NodemailerService.service";

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

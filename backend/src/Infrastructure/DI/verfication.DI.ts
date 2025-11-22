import { VerifiedOtpUseCase } from "../../Application/use-case/VerfiedOtpUseCase.usecase";
import { JwtTokenService } from "../services/TokenService.service";
import { UnitOfWork } from "../database/repositories/unitOfWork.repositories";

export function makeVerifiedEmailOTP(): VerifiedOtpUseCase {
  const unitOfrWork = new UnitOfWork();
  const token = new JwtTokenService();

  return new VerifiedOtpUseCase(token, unitOfrWork);
}


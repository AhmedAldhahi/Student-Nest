/* Infrastructure/DI/usecase.factory.ts */

import { UnitOfWork } from "../database/repositories/unitOfWork.repositories";

import { NodemailerService } from "../services/email/NodemailerService.service";

import { RegisterLandloardUseCase } from "../../Application/use-case/RegisterLandloardUseCase.usecase";
import { BcryptPasswordHasher } from "../services/BcryptPasswordHasher.service";

export function makeRegisterLandlordUseCase(): RegisterLandloardUseCase {
  const unitOfWork = new UnitOfWork();
  const passwordService = new BcryptPasswordHasher();
  const emailService = new NodemailerService();

  return new RegisterLandloardUseCase(
    unitOfWork,
    passwordService,
    emailService
  );
}

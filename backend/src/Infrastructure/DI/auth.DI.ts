import { UnitOfWork } from "../repositories/unitOfWork.repositories";

import { MailtrapService } from "../services/email/MailtrapService.service";

import { RegisterLandloardUseCase } from "../../Application/use-case/RegisterLandloardUseCase.usecase";
import { RegisterStudentUseCase } from "../../Application/use-case/RegisterStudentUseCase.usecase";
import { BcryptPasswordHasher } from "../services/BcryptPasswordHasher.service";
import { CloudinaryService } from "../services/media/CloudinaryService.service";
import { LoginUseCase } from "../../Application/use-case/LoginUseCase.usecase";
import { JwtTokenService } from "../services/TokenService.service";

export function makeRegisterLandlordUseCase(): RegisterLandloardUseCase {
  const unitOfWork = new UnitOfWork();
  const passwordService = new BcryptPasswordHasher();
 const emailService = new MailtrapService();



  return new RegisterLandloardUseCase(
    unitOfWork,
    passwordService,
    emailService
  );
}

export function makeRegisterStudentUseCase(): RegisterStudentUseCase {
  const unitOfWork = new UnitOfWork();
  const passwordService = new BcryptPasswordHasher();
  const emailService = new MailtrapService();
  const cloudinaryService = new CloudinaryService();

  return new RegisterStudentUseCase(
    unitOfWork,
    passwordService,
    emailService,
    cloudinaryService
  );
}

export function makeLoginUseCase(): LoginUseCase {
  const unitOfWork = new UnitOfWork();
  const token = new JwtTokenService();
  const passwordService = new BcryptPasswordHasher();

  return new LoginUseCase(unitOfWork, token, passwordService);
}



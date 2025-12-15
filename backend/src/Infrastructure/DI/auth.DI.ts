import { CreateStudentCommandHandler } from "../../Application/Command/Handlers/CreateStudentCommandHandler";


import { LoginUseCase } from "../../Application/Use-Case/Registeration/LoginUseCase.usecase";
import { RegisterLandloardUseCase } from "../../Application/Use-Case/Registeration/RegisterLandloardUseCase.usecase";
import { RegisterStudentUseCase } from "../../Application/Use-Case/Registeration/RegisterStudentUseCase.usecase";
import { ReadUserRepositories } from "../Repositories/Read/ReadUserRepositories";
import { UnitOfWork } from "../Repositories/unitOfWork.repositories";
import { MailtrapService } from "../Services/email/MailtrapService.service";
import { CloudinaryService } from "../Services/media/CloudinaryService.service";
import { BcryptPasswordHasher } from "../Services/security/BcryptPasswordHasher.service";
import { JwtTokenService } from "../Services/security/TokenService.service";

// export function makeRegisterLandlordUseCase(): RegisterLandloardUseCase {
//   const unitOfWork = new UnitOfWork();
//   const passwordService = new BcryptPasswordHasher();
//   const emailService = new MailtrapService();
//   const fileService = new CloudinaryService();

//   return new RegisterLandloardUseCase(
//     unitOfWork,
//     passwordService,
//     emailService,
//     fileService
//   );
// }

export function makeRegisterStudentUseCase(): RegisterStudentUseCase {
  const unitOfWork = new UnitOfWork();
  const passwordService = new BcryptPasswordHasher();
  const emailService = new MailtrapService();
  const cloudinaryService = new CloudinaryService();
  const readUserRepo = new ReadUserRepositories();

  const createStudentCommandHandler = new CreateStudentCommandHandler(
    unitOfWork,
    passwordService,
    cloudinaryService,
    readUserRepo
  );

  return new RegisterStudentUseCase(emailService, createStudentCommandHandler);
}

// export function makeLoginUseCase(): LoginUseCase {
//   const unitOfWork = new UnitOfWork();
//   const token = new JwtTokenService();
//   const passwordService = new BcryptPasswordHasher();

//   return new LoginUseCase(unitOfWork, token, passwordService);
// }

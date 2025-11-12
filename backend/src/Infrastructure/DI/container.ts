/* import neccaery implementation for interfaces */

import { UnitOfWorkRepositories } from "../database/repositories/unitOfWork.repositories";
import { BcryptPasswordHasher } from "../database/service/BcryptPasswordHasher.service";
import { JwtTokenService } from "../database/service/TokenService.service";
import { NodemailerService } from "../services/email/NodemailerService.service";

/* import builder classes need */
import { StudentBuilder } from "../../Application/builder/studentBuilder.build";
import { LandloardBuilder } from "../../Application/builder/landloardBuilder.build";

/* import  use cases need */

import { RegisterStudentUseCase } from "../../Application/use-case/RegisterStudentUseCase.usecase";
import { RegisterLandloardUseCase } from "../../Application/use-case/RegisterLandloardUseCase.usecase";
import { LoginUseCase } from "../../Application/use-case/LoginUseCase.usecase";
import { ForgetPasswordUseCase } from "../../Application/use-case/ForgetPasswordUseCase.usecase";
import { ResendOtpUseCase } from "../../Application/use-case/ResendOtpUseCase.usecase";
import { VerifiedOtpUseCase } from "../../Application/use-case/VerfiedOtpUseCase.usecase";

export const buildDependencies = () => {
  const unitOfWork = new UnitOfWorkRepositories();
  const passwordService = new BcryptPasswordHasher();
  const tokenService = new JwtTokenService();
  const emailService = new NodemailerService();

  const studentBuilder = new StudentBuilder();
  const landlordBuilder = new LandloardBuilder();

  const registerStudentUseCase = new RegisterStudentUseCase(
    unitOfWork,
    passwordService,
    studentBuilder,
    emailService
  );

  const registerLandlordUseCase = new RegisterLandloardUseCase(
    unitOfWork,
    passwordService,
    landlordBuilder,
    emailService
  );

  const loginUseCase = new LoginUseCase(
    unitOfWork,
    tokenService,
    passwordService
  );
  const forgetPasswordUseCase = new ForgetPasswordUseCase(
    unitOfWork,
    tokenService,
    passwordService
  );
  const resendOtpUseCase = new ResendOtpUseCase(emailService, unitOfWork);
  const verifiedOtpUseCase = new VerifiedOtpUseCase(tokenService, unitOfWork);

  return {
    useCases: {
      registerStudentUseCase,
      registerLandlordUseCase,
      loginUseCase,
      forgetPasswordUseCase,
      resendOtpUseCase,
      verifiedOtpUseCase,
    },
  };
};

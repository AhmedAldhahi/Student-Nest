import { VerifiedOtpUseCase } from "../../../Application/Use-Case/Verfication/OTP/VerfiedOtpUseCase.usecase";
import { JwtTokenService } from "../../Services/security/TokenService.service";
import { UnitOfWork } from "../../Repositories/unitOfWork.repositories";
import { MailtrapService } from "../../Services/email/MailtrapService.service";
import { ForgetPasswordUseCase } from "../../../Application/Use-Case/Verfication/ForgetPassword/ForgetPasswordUseCase.usecase";
import { BcryptPasswordHasher } from "../../Services/security/BcryptPasswordHasher.service";
import { VerifiedForgetPasswordOtpUseCase } from "../../../Application/Use-Case/Verfication/ForgetPassword/VerfiedForgetPasswordOtpUseCase.usecase";
import { ResendOtpUseCase } from "../../../Application/Use-Case/Verfication/OTP/ResendOtpUseCase.usecase";
import { ResendOtpForgetPasswordUseCase } from "../../../Application/Use-Case/Verfication/ForgetPassword/ResendOtpForgetPasswordUseCase.usecase";
import { ReadUserRepositories } from "../../Repositories/Read/ReadUserRepositories";
import { ResendOtpCommandHandler } from "../../../Application/Command/Handlers/Identiy/ResendOtpCommandHandler";
import { ResendOtpForgetPassCommandHandler } from "../../../Application/Command/Handlers/Identiy/ResendOtpForgetPassCommandHandler";
import { UpdateForgetPasswordCommandHandler } from "../../../Application/Command/Handlers/Identiy/UpdateForgetPasswordCommandHandler";
import { VerifiedOtpCommandHandler } from "../../../Application/Command/Handlers/Identiy/VerfiedOtpCommandHandler";
import { VerifiedOTPForgetPassCommandHandler } from "../../../Application/Command/Handlers/Identiy/VerfiedOtpResetPassCommandHandler";

export function makeVerifiedEmailOTP(): VerifiedOtpUseCase {
  const unitOfrWork = new UnitOfWork();
  const token = new JwtTokenService();
  const readUserRepo = new ReadUserRepositories();

  const commandHandler = new VerifiedOtpCommandHandler(
    unitOfrWork,
    readUserRepo
  );

  return new VerifiedOtpUseCase(token, commandHandler);
}

export function makeResendEmailOTP(): ResendOtpUseCase {
  const unitOfrWork = new UnitOfWork();
  const emailService = new MailtrapService();
  const readRepo = new ReadUserRepositories();

  const commandHandler = new ResendOtpCommandHandler(readRepo, unitOfrWork);

  return new ResendOtpUseCase(emailService, commandHandler);
}

export function makeUpdateForgetPass(): ForgetPasswordUseCase {
  const unitOfrWork = new UnitOfWork();
  const token = new JwtTokenService();
  const passwordService = new BcryptPasswordHasher();
  const readRepo = new ReadUserRepositories();

  const commandHandler = new UpdateForgetPasswordCommandHandler(
    passwordService,
    unitOfrWork,
    readRepo
  );

  return new ForgetPasswordUseCase(token, commandHandler);
}

export function makeResendForgetPassword(): ResendOtpForgetPasswordUseCase {
  const unitOfrWork = new UnitOfWork();
  const emailService = new MailtrapService();
  const readRepo = new ReadUserRepositories();

  const commandHandler = new ResendOtpForgetPassCommandHandler(
    unitOfrWork,
    readRepo
  );

  return new ResendOtpForgetPasswordUseCase(emailService, commandHandler);
}

export function makeVerifiedForgetPasswordOTP(): VerifiedForgetPasswordOtpUseCase {
  const unitOfWork = new UnitOfWork();
  const readRepo = new ReadUserRepositories();

  const commandHandler = new VerifiedOTPForgetPassCommandHandler(unitOfWork,readRepo);


  return new VerifiedForgetPasswordOtpUseCase(commandHandler);
}


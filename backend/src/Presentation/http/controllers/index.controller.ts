import { buildDependencies } from "../../../Infrastructure/DI/container";
import { PasswordRecoverController } from "./PasswordRecovery.controller";
import { AuthController } from "./Registeration.controller";
import { VerificationController } from "./Verfication.controller";
// import { PasswordRecoverController } from "./PasswordRecovery.controller";

export const buildControllers = () => {
  const { useCases } = buildDependencies();

  const authController = new AuthController(
    useCases.registerLandlordUseCase,
    useCases.registerStudentUseCase,
    useCases.LoginUseCase
  );

  // Uncomment and initialize when you implement these use cases
  const verificationController = new VerificationController(
    useCases.resendOTPUseCase,
    useCases.verifiedOTPUseCase
  );

  const passwordRecoverController = new PasswordRecoverController(
    useCases.forgetPasswordUseCase,
    useCases.resendOtpForgetPassword,
    useCases.verfiedForgetPasswordUseCase
  );

  return {
    authController,
    verificationController,
    passwordRecoverController,
  };
};

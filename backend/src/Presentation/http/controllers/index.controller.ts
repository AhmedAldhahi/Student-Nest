import { buildDependencies } from "../../../Infrastructure/DI/container";
import { AuthController } from "./Registeration.controller";
// import { VerficationController } from "./Verfication.controller";
// import { PasswordRecoverController } from "./PasswordRecovery.controller";

export const buildControllers = () => {
  const { useCases } = buildDependencies();

  const authController = new AuthController(
    useCases.registerLandlordUseCase,
    useCases.registerStudentUseCase,
    useCases.LoginUseCase
  );

  // Uncomment and initialize when you implement these use cases
  // const verficationController = new VerficationController(
  //   useCases.resendOtpUseCase,
  //   useCases.verifiedOtpUseCase
  // );

  // const passwordRecoverController = new PasswordRecoverController(
  //   useCases.forgetPasswordUseCase
  // );

  return {
    authController,

    // verficationController,
    // passwordRecoverController
  };
};

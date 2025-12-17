import { buildDependencies } from "../../../Infrastructure/DI/container";
import { UserManagementController } from "./admin/userMangement.controller";
import { PasswordRecoverController } from "./PasswordRecovery.controller";
import { ProfileController } from "./Profile.controller";
import { AuthController } from "./Registeration.controller";
import { VerificationController } from "./Verfication.controller";


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

  const profileController = new ProfileController(
    useCases.userProfileData,
    useCases.updateProfileUseCase
  );

  const adminLandloardManagementController = new UserManagementController(
    useCases.getAllLandlordUseCase,
    useCases.updateLandlordStatusUseCase,
    useCases.DeleteLandlordByIdUseCase,
    useCases.findUserByEmailUseCase,
    useCases.GetAllStudentUseCase
  );

  return {
    authController,
    verificationController,
   passwordRecoverController,
    profileController,
    adminLandloardManagementController,
  };
};

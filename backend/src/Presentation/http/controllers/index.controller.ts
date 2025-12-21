import { buildDependencies } from "../../../Infrastructure/DI/container";
import { LeaseManagementController } from "./admin/leaseMangement.controller";
import { LeaseRequestManagementController } from "./admin/leaseRequestMangement.controller";
import { NotificationController } from "./admin/Notifcation.controller";
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
    // useCases.getAllLandlordUseCase,
    useCases.GetAllUsersUseCase,
    useCases.updateLandlordStatusUseCase,
    useCases.DeleteLandlordByIdUseCase,
    useCases.findUserByEmailUseCase
  );

  const adminLeaseMangementController = new LeaseManagementController(
    useCases.GetAllLeaseUseCase,
    useCases.getLeaseById
  );

  const adminLeaseRequestManagementController =
    new LeaseRequestManagementController(
      useCases.getAllLeaseRequestUseCase,
      useCases.getLeaseRequestByIdUseCase
    );

  const adminNotificationController = new NotificationController(
    useCases.GetAllNotificationUseCase
  );

  return {
    authController,
    verificationController,
    passwordRecoverController,
    profileController,
    adminLandloardManagementController,
    adminLeaseMangementController,
    adminLeaseRequestManagementController,
    adminNotificationController,
  };
};

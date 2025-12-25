import { buildDependencies } from "../../../Infrastructure/DI/container";
import { ApartmentManagementController } from "./admin/apartmentManagement.controller";
import { ProfileController } from "./Profile.controller";
import { PasswordRecoverController } from "./PasswordRecovery.controller";
import { LeaseRequestManagementController } from "./admin/leaseRequestManagement.controller";
import { NotificationController } from "./Notification.controller";
import { UserManagementController } from "./admin/userManagement.controller";
import { AuthController } from "./Registration.controller";
import { VerificationController } from "./Verification.controller";
import { AuditLogController } from "./admin/auditLogManagement.controller";
import { LeaseManagementController } from "./admin/leaseManagement.controller";

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
    useCases.verifiedForgetPasswordUseCase
  );

  const profileController = new ProfileController(
    useCases.userProfileData,
    useCases.updateProfileUseCase
  );

  const adminLandlordManagementController = new UserManagementController(
    // useCases.getAllLandlordUseCase,
    useCases.GetAllUsersUseCase,
    useCases.updateLandlordStatusUseCase,
    useCases.DeleteLandlordByIdUseCase,
    useCases.findUserByEmailUseCase,
    useCases.updateAccountActivateUseCase
  );

  const adminLeaseManagementController = new LeaseManagementController(
    useCases.GetAllLeaseUseCase,
    useCases.getLeaseById
  );

  const adminLeaseRequestManagementController =
    new LeaseRequestManagementController(
      useCases.getAllLeaseRequestUseCase,
      useCases.getLeaseRequestByIdUseCase
    );

  const adminNotificationController = new NotificationController(
    useCases.GetAllNotificationUseCase,
    useCases.updateNotificationUseCase,
    useCases.deleteNotificationByIdUseCase
  );

  const adminAuditLogController = new AuditLogController(
    useCases.findAllAuditLogUseCase
  );

  const adminApartmentController = new ApartmentManagementController(
    useCases.GetAllApartmentUseCase,
    useCases.getApartmentsByNameUseCase,
    useCases.editStatusApartmentVerifiedUseCase,
    useCases.deleteApartmentByIdUseCase,
    useCases.findApartmentDocumentById,
    useCases.findApartmentDetailById,
    useCases.editApartmentUseCase,
    useCases.editApartmentDocumentUseCase
  );

  return {
    authController,
    verificationController,
    passwordRecoverController,
    profileController,
    adminLandlordManagementController,
    adminLeaseManagementController,
    adminLeaseRequestManagementController,
    adminNotificationController,
    adminApartmentController,
    adminAuditLogController,
  };
};

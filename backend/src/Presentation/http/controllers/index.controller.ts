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
import { ApartmentController } from "./Landlord/ApartmentMangement.controller";

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

  const adminUserManagementController = new UserManagementController(
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
    useCases.deleteNotificationByIdUseCase,
    useCases.deleteAllNotificationUseCase,
    useCases.deleteSpecificNotificationUseCase
  );

  const adminAuditLogController = new AuditLogController(
    useCases.findAllAuditLogUseCase,
    useCases.findAuditLogQueryUseCase
  );

  const adminApartmentController = new ApartmentManagementController(
    useCases.GetAllApartmentUseCase,
    useCases.getApartmentsByQueriesUseCase,
    useCases.editStatusApartmentVerifiedUseCase,
    useCases.deleteApartmentByIdUseCase,
    useCases.findApartmentDocumentById,
    useCases.findApartmentDetailById
  );

  const LandlordApartmentController = new ApartmentController(
    useCases.createApartmentsUseCase,
    useCases.addApartmentDocumentUseCase,
    useCases.editApartmentDocumentUseCase,
    useCases.editApartmentUseCase
  );

  return {
    authController,
    verificationController,
    passwordRecoverController,
    profileController,
    adminUserManagementController,
    adminLeaseManagementController,
    adminLeaseRequestManagementController,
    adminNotificationController,
    adminApartmentController,
    adminAuditLogController,
    LandlordApartmentController,
  };
};

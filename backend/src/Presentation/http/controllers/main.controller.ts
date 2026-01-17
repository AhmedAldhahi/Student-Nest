import { buildDependencies } from "../../../Infrastructure/DIC/DIC";
import { AuditLogController } from "./Adminstration/auditLogManagement.controller";
import { UserManagementController } from "./Adminstration/userManagement.controller";
import { ApartmentManagementControllerForAdmin } from "./Apartment/ApartmentControllerForAdmin";
import { ApartmentControllerForLandlord } from "./Apartment/ApartmentControllerForLandlord";
import { SharedApartmentManagementController } from "./Apartment/ApartmentControllerShared";
import { PasswordRecoverController } from "./IdentityAndAccess/PasswordRecovery.controller";
import { ProfileController } from "./IdentityAndAccess/Profile.controller";
import { AuthController } from "./IdentityAndAccess/Registration.controller";
import { VerificationController } from "./IdentityAndAccess/Verification.controller";
import { LeaseManagementForLandlord } from "./Lease/LeaseForLandlord.controller";
import { SharedLeaseManagementController } from "./Lease/SharedLease.controlller";
import { SharedLeaseRequestController } from "./LeaseRequest/SharedleaseReques.controller";
import { LeastRequestForLandlordController } from "./LeaseRequest/LeastRequestForLandlord.controller";
import { PaymentForLandlordController } from "./Payment/PaymentForLandlord.controller";
import { NotificationController } from "./Shared/Notification.controller";
import { SharedPaymentController } from "./Payment/SharedPayment.controller";
import { ApartmentControllerForStudent } from "./Apartment/ApartmentControllerForStudent";
import { LeaseRequestForStudentController } from "./LeaseRequest/LeaseRequstForStudent.controller";

export const buildControllersBoundaryContext = () => {
  const { commandHandler, QueriesHandler, StrategyContext, SimpleFactory } =
    buildDependencies();

  const authController = new AuthController(
    commandHandler.RegisterLandlordCommandHandler,
    commandHandler.RegisterStudentCommandHandler,
    QueriesHandler.LoginUserQueriesHandler
  );

  const verificationController = new VerificationController(
    commandHandler.ResendOtpCommandHandler,
    commandHandler.VerifiedOtpCommandHandler
  );

  const passwordRecoverController = new PasswordRecoverController(
    commandHandler.ResendOtpForgetPasswordCommandHandler,
    commandHandler.VerifiedOtpForgetPasswordCommandHandler,
    commandHandler.UpdateForgetPasswordCommandHandler
  );

  const profileController = new ProfileController(
    StrategyContext.ProfileContext
  );

  const NotificationsController = new NotificationController(
    StrategyContext.notificationUserContext,
    commandHandler.UpdateNotificationStatus,
    commandHandler.DeleteSpecificNotification
  );

  const LandlordLeaseRequestController = new LeastRequestForLandlordController(
    commandHandler.ChangeLeaseRequestCommandHandler,
    QueriesHandler.GetAllLeaseRequestForLandlordForSingleApartmentQueriesHandler,
    QueriesHandler.SearchForLeaseRequestForLandlordForSingleApartmentQueriesHandler
  );

  const sharedLeaseRequestController = new SharedLeaseRequestController(
    StrategyContext.UsersLeaseRequestContext
  );

  const adminAuditLogController = new AuditLogController(
    QueriesHandler.GetAllAuditLogQueriesHandler,
    QueriesHandler.SearchForAuditLogQueriesHandler
  );

  const adminUserManagementController = new UserManagementController(
    commandHandler.ChangeLandlordVerificationStatusCommandHandler,
    commandHandler.DeleteUserForAdminCommandHandler,
    commandHandler.ChangeUserActivityStatusCommandHandler,
    SimpleFactory.GetAllUserFactory,
    SimpleFactory.SearchForAllUserFactory
  );

  const adminApartmentController = new ApartmentManagementControllerForAdmin(
    commandHandler.ChangeApartmentVerificationStatusCommandHandler
  );

  const LandlordApartmentController = new ApartmentControllerForLandlord(
    commandHandler.AddNewApartmentCommandHandler,
    commandHandler.AddApartmentDocumentCommandHandler,
    commandHandler.UpdateApartmentDocumentCommandHandler,
    commandHandler.UpdateApartmentDetailCommandHandler,
    QueriesHandler.GetAllApartmentBeenBookedQueriesHandler
  );

  const SharedApartmentController = new SharedApartmentManagementController(
    StrategyContext.ApartmentUserContext,
    QueriesHandler.GetApartmentDetailsForGuestQueriesHandler
  );

  const PaymentForLandlord = new PaymentForLandlordController(
    commandHandler.ChangePaymentStatusCommandHandler,
    QueriesHandler.GetAllPaymentScheduleForSingleLeaseQueriesHandler,
    QueriesHandler.GetReceiptorPaymentQueriesHandler
  );

  const SharedPayment = new SharedPaymentController(
    StrategyContext.UserPaymentsContext
  );

  const LeaseForLandlord = new LeaseManagementForLandlord(
    QueriesHandler.SearchForLeaseForLandlordForSingleApartmentQueriesHandler,
    QueriesHandler.GetLeaseForLandlordForSingleApartmentQueriesHandler
  );

  const SharedLease = new SharedLeaseManagementController(
    StrategyContext.UserLeasesContext
  );

  const apartmentControllerForStudent = new ApartmentControllerForStudent(
    QueriesHandler.GetApartmentRandomlyThatNotFullAndVerifiedQueriesHandler,
    QueriesHandler.GetApartmentNotFullAndVerifiedQueriesHandler
  );

  const StudentLeaseRequest = new LeaseRequestForStudentController(
    commandHandler.CreateLeaseRequestCommandHandler
  );

  const LeaseRequest = {
    Landlord: LandlordLeaseRequestController,
    Shared: sharedLeaseRequestController,
    Student:StudentLeaseRequest
  };

  const Apartment = {
    Admin: adminApartmentController,
    Landlord: LandlordApartmentController,
    Student: apartmentControllerForStudent,
    Shared: SharedApartmentController,
  };

  const Payment = {
    Landlord: PaymentForLandlord,
    Shared: SharedPayment,
  };

  const Lease = {
    Landlord: LeaseForLandlord,
    Shared: SharedLease,
  };

  return {
    authController,
    verificationController,
    passwordRecoverController,
    profileController,
    NotificationsController,
    adminAuditLogController,
    adminUserManagementController,
    LeaseRequest,
    Apartment,
    Payment,
    Lease,
  };
};

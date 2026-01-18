import {
  ChangeApartmentVerificationStatusCH,
  ChangeLandlordVerificationStatusCH,
  ChangeUserActivityStatusCH,
  DeleteApartmentByIdForAdminCH,
  DeleteUserForAdminCH,
  GetAllAuditLogsQH,
  SearchForAuditLogQH,
} from "./administration";
import {
  AddApartmentDocumentCH,
  AddNewApartmentCH,
  DeleteApartmentByIdForLandlordCH,
  GetAllBookedApartmentQH,
  GetAllVisibleAndNotFullApartmentQH,
  GetApartmentDetailForGuestQH,
  GetRandomlyThreeApartmentThatIsVisibleAndNotFullQH,
  UpdateApartmentDetailCH,
  UpdateApartmentDocumentsCH,
  UserApartmentContext,
} from "./apartment";
import {
  findUserByQuery,
  GetAllUsers,
  LoginUserQH,
  RegisterLandlordCH,
  RegisterStudentCH,
  ResendOtpCH,
  ResendOtpForgetPasswordCH,
  UpdateForgetPasswordCH,
  UserProfileContext,
  VerifiedOtpCH,
  VerifiedOtpForgetPasswordCH,
} from "./IdentityAndAccess";
import {
  GetForAllLeaseForSingleApartmentQH,
  SearchForAllLeaseForSingleApartmentQH,
  UserLeaseContext,
} from "./Lease";
import {
  ChangeLeaseRequestCH,
  CreateLeaseRequestCH,
  GetAllLeaseRequestForLandlordForSingleApartmentQH,
  SearchAllLeaseRequestForLandlordForSingleApartmentQH,
  UserLeaseRequestContext,
} from "./LeaseRequest";
import { ChangeStatusOfPaymentCH, UserPaymentContext } from "./Payment";
import {
  DeleteSpecificNotifications,
  notificationContext,
  updateNotificationStatus,
} from "./shared/NotificationManagement";

export function buildDependencies() {
  return {
    commandHandler: {
      RegisterLandlordCommandHandler: RegisterLandlordCH(),
      RegisterStudentCommandHandler: RegisterStudentCH(),
      ResendOtpCommandHandler: ResendOtpCH(),
      VerifiedOtpCommandHandler: VerifiedOtpCH(),
      ResendOtpForgetPasswordCommandHandler: ResendOtpForgetPasswordCH(),
      VerifiedOtpForgetPasswordCommandHandler: VerifiedOtpForgetPasswordCH(),
      UpdateForgetPasswordCommandHandler: UpdateForgetPasswordCH(),
      UpdateNotificationStatus: updateNotificationStatus(),
      DeleteSpecificNotification: DeleteSpecificNotifications(),
      ChangeLeaseRequestCommandHandler: ChangeLeaseRequestCH(),
      ChangePaymentStatusCommandHandler: ChangeStatusOfPaymentCH(),
      AddNewApartmentCommandHandler: AddNewApartmentCH(),
      AddApartmentDocumentCommandHandler: AddApartmentDocumentCH(),
      DeleteApartmentByIdForLandlordCommandHandler:
        DeleteApartmentByIdForLandlordCH(),
      UpdateApartmentDetailCommandHandler: UpdateApartmentDetailCH(),
      UpdateApartmentDocumentCommandHandler: UpdateApartmentDocumentsCH(),
      ChangeLandlordVerificationStatusCommandHandler:
        ChangeLandlordVerificationStatusCH(),
      ChangeUserActivityStatusCommandHandler: ChangeUserActivityStatusCH(),
      ChangeApartmentVerificationStatusCommandHandler:
        ChangeApartmentVerificationStatusCH(),
      DeleteApartmentByIdForAdminCommandHandler:
        DeleteApartmentByIdForAdminCH(),
      DeleteUserForAdminCommandHandler: DeleteUserForAdminCH(),
      CreateLeaseRequestCommandHandler: CreateLeaseRequestCH(),
    },

    QueriesHandler: {
      LoginUserQueriesHandler: LoginUserQH(),
      GetAllAuditLogQueriesHandler: GetAllAuditLogsQH(),
      SearchForAuditLogQueriesHandler: SearchForAuditLogQH(),
      GetAllApartmentBeenBookedQueriesHandler: GetAllBookedApartmentQH(),
      GetAllLeaseRequestForLandlordForSingleApartmentQueriesHandler:
        GetAllLeaseRequestForLandlordForSingleApartmentQH(),
      SearchForLeaseRequestForLandlordForSingleApartmentQueriesHandler:
        SearchAllLeaseRequestForLandlordForSingleApartmentQH(),
      SearchForLeaseForLandlordForSingleApartmentQueriesHandler:
        SearchForAllLeaseForSingleApartmentQH(),
      GetLeaseForLandlordForSingleApartmentQueriesHandler:
        GetForAllLeaseForSingleApartmentQH(),

      GetApartmentRandomlyThatNotFullAndVerifiedQueriesHandler:
        GetRandomlyThreeApartmentThatIsVisibleAndNotFullQH(),
      GetApartmentNotFullAndVerifiedQueriesHandler:
        GetAllVisibleAndNotFullApartmentQH(),
      GetApartmentDetailsForGuestQueriesHandler: GetApartmentDetailForGuestQH(),
    },

    StrategyContext: {
      ProfileContext: UserProfileContext(),
      notificationUserContext: notificationContext(),
      ApartmentUserContext: UserApartmentContext(),
      UsersLeaseRequestContext: UserLeaseRequestContext(),
      UserLeasesContext: UserLeaseContext(),
      UserPaymentsContext: UserPaymentContext(),
    },
    SimpleFactory: {
      GetAllUserFactory: GetAllUsers(),
      SearchForAllUserFactory: findUserByQuery(),
    },
  };
}

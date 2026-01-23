import { UpdateWhatsappPhoneNumberCommand } from "../../Application/BoundedContexts/RoommateProfile/Command/UpdateVisableForWhatsappCommand";
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
  GetFilterApartmentQH,
  GetRandomlyThreeApartmentThatIsVisibleAndNotFullQH,
  SearchForVisibleApartmentsQH,
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
  CreateLeaseCH,
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
import { AddReceiptForPaymentCH, ChangeStatusOfPaymentCH, UserPaymentContext } from "./Payment";
import { createRoommateProfileCH, GetRoommateProfileQH, GetRoommateProfileThatMatchQH, UpdateRoommateProfileCH, UpdateWhatsappPhoneNumberVisibleCH } from "./RoomateProfile";
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
      CreateNewReceiptForPaymentCommandHandler:AddReceiptForPaymentCH(),
      CreateRoommateProfileCommandHandler:createRoommateProfileCH(),
      updateRoommateProfileCommandHandler:UpdateRoommateProfileCH(),
      UpdateWhatsappPhoneNumberCommandHandler:UpdateWhatsappPhoneNumberVisibleCH(),
      CreateLeaseCommandHandler:CreateLeaseCH()
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
      GetFilterApartmentQueriesHandler:GetFilterApartmentQH(),
      GetRoommateProfileQueriesHandler:GetRoommateProfileQH(),
      GetRoommateProfileThatMatchQueriesHandler:GetRoommateProfileThatMatchQH(),
      SearchForVisibleApartmentsQueriesHandler:SearchForVisibleApartmentsQH(),
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

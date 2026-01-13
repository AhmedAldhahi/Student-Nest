import { getUserProfileData, updateUserProfile } from "./shared/profile.DI";

import {
  makeVerifiedEmailOTP,
  makeResendEmailOTP,
  makeUpdateForgetPass,
  makeResendForgetPassword,
  makeVerifiedForgetPasswordOTP,
} from "./shared/verification.DI";

import {
  deleteLandlordById,
  updateLandlordStatus,
  findUserByQuery,
  GetAllUsers,
  UpdateUserActivateStatusUseCase,
} from "./admin/UserManagement";

import { getAllLease, GetLeaseByQuery } from "./admin/LeaseMangement";
import {
  GetAllLeaseRequest,
  GetLeaseRequestByQuery,
} from "./admin/LeaseRequestManagement";

import {
  deleteAllNotification,
  deleteNotificationById,
  DeleteSpecificNotifications,
  GetAllNotification,
  updateNotificationStatus,
} from "./shared/NotificationManagement";

import {
  DeleteApartmentById,
  editApartmentDetailUseCase,
  EditApartmentDocumentsUseCase,
  EditApartmentStatusVerified,
  FindApartmentDetailByIdUseCase,
  FindApartmentDocumentByIdUseCase,
  GetAllApartment,
  GetApartmentByQueries,
} from "./admin/ApartmentManagement";

import {
  findAllAuditLogUseCase,
  FindAuditLogByQueriesUseCase,
} from "./admin/AuditLogManagement";
import {
  addApartmentDocumentUseCase,
  createApartmentUseCase,
  GetAllBookedApartment,
} from "./Landlord/ApartmentMangement";
import {
  GetForAllLeaseForSingleApartmentUC,
  SearchForAllLeaseForSingleApartmentUC,
} from "./Landlord/LeaseMangement";
import {
  getAllLeasesRequestForLandlordForSingleApartmentUC,
  SearchForLeasesRequestForLandlordForSingleApartmentUC,
  updateLeastRequestUC,
} from "./Landlord/LeastRequestMangement";
import {
  makeLoginUseCase,
  makeRegisterLandlordUseCase,
  makeRegisterStudentUseCase,
} from "./shared/auth.DI";
import { GetAllPaymentScheduleForSingleLeaseQueries } from "../../Application/Queries/Queries/Payment/getAllPaymentSchduleForSingleLease";
import {
  EditPaymentStatusUC,
  GetAllPaidPaymentUc,
  GetAllPaymentScheduleForSingleLeaseUC,
  GetReceiptForPaymentUC,
} from "./Landlord/PaymentMangement";
import { GetPaymentThatPaidUseCase } from "../../Application/Use-Case/Landlord/Payment/GetPaymentThatPaid.usecase";

export function buildDependencies() {
  return {
    useCases: {
      registerLandlordUseCase: makeRegisterLandlordUseCase(),
      registerStudentUseCase: makeRegisterStudentUseCase(),
      LoginUseCase: makeLoginUseCase(),

      verifiedOTPUseCase: makeVerifiedEmailOTP(),
      resendOTPUseCase: makeResendEmailOTP(),
      forgetPasswordUseCase: makeUpdateForgetPass(),
      resendOtpForgetPassword: makeResendForgetPassword(),
      verifiedForgetPasswordUseCase: makeVerifiedForgetPasswordOTP(),

      userProfileData: getUserProfileData(),
      updateProfileUseCase: updateUserProfile(),

      updateLandlordStatusUseCase: updateLandlordStatus(),
      DeleteLandlordByIdUseCase: deleteLandlordById(),
      findUserByEmailUseCase: findUserByQuery(),
      updateAccountActivateUseCase: UpdateUserActivateStatusUseCase(),
      GetAllUsersUseCase: GetAllUsers(),

      GetAllLeaseUseCase: getAllLease(),
      getLeaseById: GetLeaseByQuery(),

      getAllLeaseRequestUseCase: GetAllLeaseRequest(),
      getLeaseRequestByIdUseCase: GetLeaseRequestByQuery(),

      GetAllNotificationUseCase: GetAllNotification(),
      updateNotificationUseCase: updateNotificationStatus(),
      deleteNotificationByIdUseCase: deleteNotificationById(),
      deleteAllNotificationUseCase: deleteAllNotification(),
      deleteSpecificNotificationUseCase: DeleteSpecificNotifications(),

      GetAllApartmentUseCase: GetAllApartment(),
      getApartmentsByQueriesUseCase: GetApartmentByQueries(),
      editStatusApartmentVerifiedUseCase: EditApartmentStatusVerified(),
      deleteApartmentByIdUseCase: DeleteApartmentById(),
      findApartmentDocumentById: FindApartmentDocumentByIdUseCase(),
      findApartmentDetailById: FindApartmentDetailByIdUseCase(),
      editApartmentUseCase: editApartmentDetailUseCase(),
      editApartmentDocumentUseCase: EditApartmentDocumentsUseCase(),

      findAllAuditLogUseCase: findAllAuditLogUseCase(),
      findAuditLogQueryUseCase: FindAuditLogByQueriesUseCase(),

      createApartmentsUseCase: createApartmentUseCase(),
      addApartmentDocumentUseCase: addApartmentDocumentUseCase(),

      getAllLeaseForSingleApartmentUseCAse:
        GetForAllLeaseForSingleApartmentUC(),
      SearchForSingleApartmentUseCase: SearchForAllLeaseForSingleApartmentUC(),

      getApartmentBeenBookedUseCase: GetAllBookedApartment(),
      updateLeastRequestUseCase: updateLeastRequestUC(),
      GetAllLeasesRequestForSingleApartmentUC:
        getAllLeasesRequestForLandlordForSingleApartmentUC(),
      SearchForAllLeaseRequestForSingleApartmentUC:
        SearchForLeasesRequestForLandlordForSingleApartmentUC(),

      GetAllPaymentScheduleForSingleLeaseUseCase:
        GetAllPaymentScheduleForSingleLeaseUC(),

      GetReceiptForSinglePaymentUseCase: GetReceiptForPaymentUC(),
      EditPaymentStatusUseCase: EditPaymentStatusUC(),

      GetPaymentThatPaidUseCase: GetAllPaidPaymentUc(),
    },
  };
}

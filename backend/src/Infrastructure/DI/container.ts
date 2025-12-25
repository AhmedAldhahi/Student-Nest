import {
  makeRegisterLandlordUseCase,
  makeLoginUseCase,
  makeRegisterStudentUseCase,
} from "./auth.DI";
import { getUserProfileData, updateUserProfile } from "./profile.DI";

import {
  makeVerifiedEmailOTP,
  makeResendEmailOTP,
  makeUpdateForgetPass,
  makeResendForgetPassword,
  makeVerifiedForgetPasswordOTP,
} from "./verification.DI";

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
  GetAllNotification,
  updateNotificationStatus,
} from "./admin/NotificationManagement";

import {
  DeleteApartmentById,
  editApartmentDetailUseCase,
  EditApartmentDocumentsUseCase,
  EditApartmentStatusVerified,
  FindApartmentDetailByIdUseCase,
  FindApartmentDocumentByIdUseCase,
  GetAllApartment,
  GetApartmentByTitle,
} from "./admin/ApartmentManagement";

import { findAllAuditLogUseCase } from "./admin/AuditLogManagement";

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
      GetAllApartmentUseCase: GetAllApartment(),
      getApartmentsByNameUseCase: GetApartmentByTitle(),
      editStatusApartmentVerifiedUseCase: EditApartmentStatusVerified(),
      deleteApartmentByIdUseCase: DeleteApartmentById(),
      findApartmentDocumentById: FindApartmentDocumentByIdUseCase(),
      findApartmentDetailById: FindApartmentDetailByIdUseCase(),
      editApartmentUseCase: editApartmentDetailUseCase(),
      editApartmentDocumentUseCase: EditApartmentDocumentsUseCase(),
      findAllAuditLogUseCase: findAllAuditLogUseCase(),
    },
  };
}

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
  makeVerfiedForgetPasswordOTP,
} from "./verfication.DI";

import {
  deleteLandlordById,
  updateLandlordStatus,
  findUserByEmail,
  GetAllUsers,
} from "./admin/UserMangement";

import { getAllLease, GetLeaseById } from "./admin/UserLease";
import {
  GetAllLeaseRequest,
  GetLeaseRequestById,
} from "./admin/LeaseRequestMangament";

import {
  GetAllNotification,
  updateNotificationStatus,
} from "./admin/NotifcationMangament";
import {
  DeleteApartmentById,
  editApartmentDetailUseCase,
  EditApartmentDocumentsUseCase,
  EditApartmentStatusVerified,
  FindApartmentDetailByIdUseCase,
  FindApartmentDocumentByIdUseCase,
  GetAllApartment,
  GetApartmentByName,
} from "./admin/ApartmentMagament";


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
      verfiedForgetPasswordUseCase: makeVerfiedForgetPasswordOTP(),
      userProfileData: getUserProfileData(),
      updateProfileUseCase: updateUserProfile(),
      updateLandlordStatusUseCase: updateLandlordStatus(),
      DeleteLandlordByIdUseCase: deleteLandlordById(),
      findUserByEmailUseCase: findUserByEmail(),
      GetAllUsersUseCase: GetAllUsers(),
      GetAllLeaseUseCase: getAllLease(),
      getLeaseById: GetLeaseById(),
      getAllLeaseRequestUseCase: GetAllLeaseRequest(),
      getLeaseRequestByIdUseCase: GetLeaseRequestById(),
      GetAllNotificationUseCase: GetAllNotification(),
      updateNotficationUseCase: updateNotificationStatus(),
      GetAllApartmentUseCase: GetAllApartment(),
      getApartmentsByNameUseCase: GetApartmentByName(),
      editStatusApartmentVerifiedUseCase: EditApartmentStatusVerified(),
      deleteApartmentByIdUseCase: DeleteApartmentById(),
      findApartmentDocumentById: FindApartmentDocumentByIdUseCase(),
      findApartmentDetailById: FindApartmentDetailByIdUseCase(),
      editApartmentUseCase: editApartmentDetailUseCase(),
      editApartmentDocumentUseCase: EditApartmentDocumentsUseCase(),
    },
  };
}

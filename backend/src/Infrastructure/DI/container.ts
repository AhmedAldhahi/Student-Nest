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
  // GetAllLandlords,
  updateLandlordStatus,
  findUserByEmail,
  GetAllUsers,
  // GetAllStudents,
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
import { GetAllApartment } from "./admin/ApartmentMagament";

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
      GetAllApartmentUseCase: GetAllApartment()
    },
  };
}

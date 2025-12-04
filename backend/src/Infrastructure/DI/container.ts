import {
  makeLoginUseCase,
  makeRegisterLandlordUseCase,
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
    },
  };
}

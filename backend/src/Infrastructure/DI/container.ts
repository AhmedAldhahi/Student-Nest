import {
  makeLoginUseCase,
  makeRegisterLandlordUseCase,
  makeRegisterStudentUseCase,
} from "./usecase.DI";

import {
  makeVerifiedEmailOTP,
  makeResendEmailOTP,
  makeUpdateForgetPass,
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
    },
  };
}

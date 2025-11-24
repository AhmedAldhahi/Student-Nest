"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildDependencies = buildDependencies;
const auth_DI_1 = require("./auth.DI");
const verfication_DI_1 = require("./verfication.DI");
function buildDependencies() {
    return {
        useCases: {
            registerLandlordUseCase: (0, auth_DI_1.makeRegisterLandlordUseCase)(),
            registerStudentUseCase: (0, auth_DI_1.makeRegisterStudentUseCase)(),
            LoginUseCase: (0, auth_DI_1.makeLoginUseCase)(),
            verifiedOTPUseCase: (0, verfication_DI_1.makeVerifiedEmailOTP)(),
            resendOTPUseCase: (0, verfication_DI_1.makeResendEmailOTP)(),
            forgetPasswordUseCase: (0, verfication_DI_1.makeUpdateForgetPass)(),
            resendOtpForgetPassword: (0, verfication_DI_1.makeResendForgetPassword)(),
            verfiedForgetPasswordUseCase: (0, verfication_DI_1.makeVerfiedForgetPasswordOTP)(),
        },
    };
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordRecoveryRouter = void 0;
const express_1 = require("express");
const updateForgetPassword_middleware_1 = require("../../middlewares/rate-limited/updateForgetPassword.middleware");
const otpResendRateLimited_middleware_1 = require("../../middlewares/rate-limited/otpResendRateLimited.middleware");
const passwordRecovert_zod_1 = require("../../validation/PasswordRecovery/passwordRecovert.zod");
const VerficationSchema_zod_1 = require("../../validation/verfication/VerficationSchema.zod");
const validation_middleware_1 = require("../../middlewares/validation.middleware");
const otpVerifyRateLimited_middleware_1 = require("../../middlewares/rate-limited/otpVerifyRateLimited.middleware");
const PasswordRecoveryRouter = (RecoveryPasswordController) => {
    const router = (0, express_1.Router)();
    router.patch("/forget-password", updateForgetPassword_middleware_1.updateForgetPassword, (0, validation_middleware_1.validation)(passwordRecovert_zod_1.ForgetPasswordSchema), RecoveryPasswordController.changeForgetPassword);
    router.post("/resent-otp", otpResendRateLimited_middleware_1.otpResendRateLimited, (0, validation_middleware_1.validation)(VerficationSchema_zod_1.resendOtpSchema), RecoveryPasswordController.createResendForgetPasswordOtp);
    router.post("/verified-otp", otpVerifyRateLimited_middleware_1.otpVerifyRateLimited, (0, validation_middleware_1.validation)(VerficationSchema_zod_1.VerifiedOTpSchema), RecoveryPasswordController.createVerifiedResendPasswordOTP);
    return router;
};
exports.PasswordRecoveryRouter = PasswordRecoveryRouter;

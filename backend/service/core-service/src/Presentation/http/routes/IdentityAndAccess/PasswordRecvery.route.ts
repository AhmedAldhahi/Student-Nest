import { Router } from "express";
import { PasswordRecoverController } from "../../controllers/IdentityAndAccess/PasswordRecovery.controller";
import { otpResendRateLimited } from "../../middlewares/rate-limited/IdentityAndAccess/otpResendRateLimited.middleware";
import { ForgetPasswordSchema } from "../../validation/PasswordRecovery/passwordRecovert.zod";
import {
  resendOtpSchema,
  VerifiedOTpSchema,
} from "../../validation/verfication/VerficationSchema.zod";
import { validation } from "../../middlewares/validation.middleware";
import { otpVerifyRateLimited } from "../../middlewares/rate-limited/IdentityAndAccess/otpVerifyRateLimited.middleware";
import { loginUpdatePasswordRateLimited } from "../../middlewares/rate-limited/IdentityAndAccess/loginUpdatePasswordRateLimit.middleware";

export const PasswordRecoveryRouter = (
  RecoveryPasswordController: PasswordRecoverController
): Router => {
  const router = Router();

  router.patch(
    "/forget-password",
    loginUpdatePasswordRateLimited,
    validation(ForgetPasswordSchema),
    RecoveryPasswordController.changeForgetPassword
  );

  router.post(
    "/resent-otp",
    otpResendRateLimited,
    validation(resendOtpSchema),
    RecoveryPasswordController.createResendForgetPasswordOtp
  );

  router.post(
    "/verified-otp",
    otpVerifyRateLimited,
    validation(VerifiedOTpSchema),
    RecoveryPasswordController.createVerifiedResendPasswordOTP
  );

  return router;
};

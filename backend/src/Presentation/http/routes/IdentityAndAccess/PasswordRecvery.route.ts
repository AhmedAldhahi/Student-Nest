import { Router } from "express";
import { PasswordRecoverController } from "../../controllers/IdentityAndAccess/PasswordRecovery.controller";
import { updateForgetPassword } from "../../middlewares/rate-limited/updateForgetPassword.middleware";
import { otpResendRateLimited } from "../../middlewares/rate-limited/otpResendRateLimited.middleware";
import { ForgetPasswordSchema } from "../../validation/PasswordRecovery/passwordRecovert.zod";
import {
  resendOtpSchema,
  VerifiedOTpSchema,
} from "../../validation/verfication/VerficationSchema.zod";
import { validation } from "../../middlewares/validation.middleware";
import { otpVerifyRateLimited } from "../../middlewares/rate-limited/otpVerifyRateLimited.middleware";

export const PasswordRecoveryRouter = (
  RecoveryPasswordController: PasswordRecoverController
): Router => {
  const router = Router();

  router.patch(
    "/forget-password",
    updateForgetPassword,
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

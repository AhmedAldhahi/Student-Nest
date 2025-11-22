import { Router } from "express";
import { PasswordRecoverController } from "../controllers/PasswordRecovery.controller";
import { updateForgetPassword } from "../middlewares/rate-limited/updateForgetPassword.middleware";
import { otpResendRateLimited } from "../middlewares/rate-limited/otpResendRateLimited.middleware";
import { ForgetPasswordSchema } from "../validation/PasswordRecovery/passwordRecovert.zod";
import { resendOtpSchema } from "../validation/verfication/VerficationSchema.zod";
import { validation } from "../middlewares/validation.middleware";

export const PasswordRecoveryRouter = (
  RecoveryPasswordController: PasswordRecoverController
): Router => {
  const router = Router();

  //   /* todo: need to add the flag to check that otp been send and verified or not  */
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

  return router;
};

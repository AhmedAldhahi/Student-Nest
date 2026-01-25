import { Router } from "express";
import { VerificationController } from "../../controllers/IdentityAndAccess/Verification.controller";
import { otpResendRateLimited } from "../../middlewares/rate-limited/IdentityAndAccess/otpResendRateLimited.middleware";
import { otpVerifyRateLimited } from "../../middlewares/rate-limited/IdentityAndAccess/otpVerifyRateLimited.middleware";
import { validation } from "../../middlewares/validation.middleware";
import { resendOtpSchema, VerifiedOTpSchema } from "../../validation/verfication/VerficationSchema.zod";

export const createVerificationRouter = (
  verificationController: VerificationController
): Router => {
  const router = Router();

  router.post(
    "/resend-otp",
    otpResendRateLimited,
    validation(resendOtpSchema),
    verificationController.createResendOtp
  );

  router.post(
    "/verified-otp",
    otpVerifyRateLimited,
    validation(VerifiedOTpSchema),

    verificationController.createVerifiedOtp
  );

  return router;
};

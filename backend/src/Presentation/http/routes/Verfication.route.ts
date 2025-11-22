import { Router } from "express";
import { VerificationController } from "../controllers/Verfication.controller";
import { otpResendRateLimited } from "../middlewares/rate-limited/otpResendRateLimited.middleware";
import { validation } from "../middlewares/validation.middleware";
import {
  resendOtpSchema,
  VerifiedOTpSchema,
} from "../validation/verfication/VerficationSchema.zod";
import { otpVerifyRateLimited } from "../middlewares/rate-limited/otpVerifyRateLimited.middleware";

export const createVerficationRouter = (
  verificationController: VerificationController
): Router => {
  const router = Router();

  router.post(
    "/resend-otp",
    validation(resendOtpSchema),
    otpResendRateLimited,
    verificationController.createResendOtp
  );

  router.post(
    "/verified-otp",
    otpVerifyRateLimited,
    validation(VerifiedOTpSchema),

    verificationController.createVerifiedOtp
  );

  //TODO: need to do
  //   router.get("/verification-status");

  return router;
};

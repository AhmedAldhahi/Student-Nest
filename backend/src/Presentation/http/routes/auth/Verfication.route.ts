import { Router } from "express";
import { VerficationController } from "../../controllers/Verfication.controller";
import { otpResendRateLimited } from "../../middlewares/rate-limited/otpResendRateLimited.middleware";
import { validation } from "../../middlewares/validation.middleware";
import { resendOtpSchema } from "../../validation/verfication/VerficationSchema.zod";

export const createVerficationRouter = (
  verficationController: VerficationController
): Router => {
  const router = Router();

  router.patch(
    "/resend-otp",
    validation(resendOtpSchema),
  //  otpResendRateLimited,
    verficationController.createResendOtp
  );

  // need to add rate limit and the zod

  return router;
};

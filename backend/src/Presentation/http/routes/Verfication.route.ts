// import { Router } from "express";
// import { VerficationController } from "../controllers/Verfication.controller";
// import { otpResendRateLimited } from "../middlewares/rate-limited/otpResendRateLimited.middleware";
// import { validation } from "../middlewares/validation.middleware";
// import {
//   resendOtpSchema,
//   VerifiedOTpSchema,
// } from "../validation/verfication/VerficationSchema.zod";
// import { otpVerifyRateLimited } from "../middlewares/rate-limited/otpVerifyRateLimited.middleware";

// export const createVerficationRouter = (
//   verficationController: VerficationController
// ): Router => {
//   const router = Router();

//   router.post(
//     "/resend-otp",
//     validation(resendOtpSchema),
//     otpResendRateLimited,
//     verficationController.createResendOtp
//   );

//   router.post(
//     "/verified-otp",
//    // otpVerifyRateLimited,
//     validation(VerifiedOTpSchema),

//     verficationController.createVerfiedOtp
//   );

//   //TODO: need to do 
//   router.get("/verification-status")

  

//   return router;
// };

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVerficationRouter = void 0;
const express_1 = require("express");
const otpResendRateLimited_middleware_1 = require("../../middlewares/rate-limited/otpResendRateLimited.middleware");
const validation_middleware_1 = require("../../middlewares/validation.middleware");
const VerficationSchema_zod_1 = require("../../validation/verfication/VerficationSchema.zod");
const otpVerifyRateLimited_middleware_1 = require("../../middlewares/rate-limited/otpVerifyRateLimited.middleware");
const createVerficationRouter = (verificationController) => {
    const router = (0, express_1.Router)();
    router.post("/resend-otp", (0, validation_middleware_1.validation)(VerficationSchema_zod_1.resendOtpSchema), otpResendRateLimited_middleware_1.otpResendRateLimited, verificationController.createResendOtp);
    router.post("/verified-otp", otpVerifyRateLimited_middleware_1.otpVerifyRateLimited, (0, validation_middleware_1.validation)(VerficationSchema_zod_1.VerifiedOTpSchema), verificationController.createVerifiedOtp);
    return router;
};
exports.createVerficationRouter = createVerficationRouter;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVerficationRouter = void 0;
const express_1 = require("express");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const VerficationSchema_zod_1 = require("../validation/verfication/VerficationSchema.zod");
const createVerficationRouter = (verficationController) => {
    const router = (0, express_1.Router)();
    router.patch("/resend-otp", (0, validation_middleware_1.validation)(VerficationSchema_zod_1.resendOtpSchema), verficationController.createResendOtp);
    router.post("/verified-otp", (0, validation_middleware_1.validation)(VerficationSchema_zod_1.VerifiedOTpSchema), verficationController.createVerfiedOtp);
    return router;
};
exports.createVerficationRouter = createVerficationRouter;

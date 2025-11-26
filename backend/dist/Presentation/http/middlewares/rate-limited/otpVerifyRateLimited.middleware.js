"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpVerifyRateLimited = void 0;
const express_rate_limit_1 = require("express-rate-limit");
const validationZod_constant_1 = require("../../../../Shared/constants/validationZod.constant");
exports.otpVerifyRateLimited = (0, express_rate_limit_1.rateLimit)({
    windowMs: 5 * 60 * 1000,
    limit: validationZod_constant_1.testRate,
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            message: "Too many login requests. Please wait a while before trying again.",
        });
    },
});

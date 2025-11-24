"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpVerifyRateLimited = void 0;
const express_rate_limit_1 = require("express-rate-limit");
exports.otpVerifyRateLimited = (0, express_rate_limit_1.rateLimit)({
    windowMs: 5 * 60 * 1000,
    limit: 3,
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            message: "Too many login requests. Please wait a while before trying again.",
        });
    },
});

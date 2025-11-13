"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpResendRateLimited = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
exports.otpResendRateLimited = (0, express_rate_limit_1.default)({
    windowMs: 10 * 60 * 1000,
    limit: 3,
    keyGenerator: (req, res) => req.body.email || req.ip,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            message: "Too many OTP resend requests. Please wait a while before trying again.",
        });
    },
});

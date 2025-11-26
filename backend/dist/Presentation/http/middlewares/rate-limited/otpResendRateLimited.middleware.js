"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpResendRateLimited = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const validationZod_constant_1 = require("../../../../Shared/constants/validationZod.constant");
exports.otpResendRateLimited = (0, express_rate_limit_1.default)({
    windowMs: 10 * 60 * 1000,
    limit: validationZod_constant_1.testRate,
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            message: "Too many login requests. Please wait a while before trying again.",
        });
    },
});

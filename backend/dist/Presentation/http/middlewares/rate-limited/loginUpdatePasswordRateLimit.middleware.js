"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUpdatePasswordRateLimited = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const validationZod_constant_1 = require("../../../../Shared/constants/validationZod.constant");
exports.loginUpdatePasswordRateLimited = (0, express_rate_limit_1.default)({
    windowMs: 10 * 60 * 1000,
    limit: validationZod_constant_1.testRate,
    keyGenerator: (req, res) => req.body.email || req.ip,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            message: "Too many update password atemp requests. Please wait a while before trying again.",
        });
    },
});

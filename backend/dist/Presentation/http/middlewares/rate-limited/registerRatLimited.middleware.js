"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerApiRateLimited = void 0;
const express_rate_limit_1 = require("express-rate-limit");
exports.registerApiRateLimited = (0, express_rate_limit_1.rateLimit)({
    windowMs: 60 * 60 * 1000,
    limit: 5,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    ipv6Subnet: 56,
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            message: 'Too many registration attempts. Please try again later.',
        });
    },
});

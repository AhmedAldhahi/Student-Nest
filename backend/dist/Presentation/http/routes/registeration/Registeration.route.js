"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthRouter = void 0;
const express_1 = require("express");
const validation_middleware_1 = require("../../middlewares/validation.middleware");
const RegisterStudentSchema_zod_1 = require("../../validation/auth/RegisterStudentSchema.zod");
const RegisterStudentSchema_zod_2 = require("../../validation/auth/RegisterStudentSchema.zod");
const registerRatLimited_middleware_1 = require("../../middlewares/rate-limited/registerRatLimited.middleware");
const loginRateLimit_middleware_1 = require("../../middlewares/rate-limited/loginRateLimit.middleware");
const loginUserSchema_zod_1 = require("../../validation/auth/loginUserSchema.zod");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
const createAuthRouter = (authController) => {
    const router = (0, express_1.Router)();
    router.post("/register/student", upload.single("verificationFile"), (0, validation_middleware_1.validation)(RegisterStudentSchema_zod_1.RegisterStudetSchema), registerRatLimited_middleware_1.registerApiRateLimited, authController.registerStudent);
    router.post("/register/landlord", (0, validation_middleware_1.validation)(RegisterStudentSchema_zod_2.RegisterLandloardSchema), registerRatLimited_middleware_1.registerApiRateLimited, authController.registerLandloard);
    router.post("/login", (0, validation_middleware_1.validation)(loginUserSchema_zod_1.loginSchema), loginRateLimit_middleware_1.loginRateLimited, authController.loginUser);
    return router;
};
exports.createAuthRouter = createAuthRouter;

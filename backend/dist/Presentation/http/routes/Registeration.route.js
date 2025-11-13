"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthRouter = void 0;
const express_1 = require("express");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const RegisterStudentSchema_zod_1 = require("../validation/auth/RegisterStudentSchema.zod");
const RegisterStudentSchema_zod_2 = require("../validation/auth/RegisterStudentSchema.zod");
const loginUserSchema_zod_1 = require("../validation/auth/loginUserSchema.zod");
const createAuthRouter = (authController) => {
    const router = (0, express_1.Router)();
    router.post("/register/student", (0, validation_middleware_1.validation)(RegisterStudentSchema_zod_1.RegisterStudetSchema), authController.registerStudent);
    router.post("/register/landlord", (0, validation_middleware_1.validation)(RegisterStudentSchema_zod_2.RegisterLandloardSchema), authController.registerLandloard);
    router.post("/login", (0, validation_middleware_1.validation)(loginUserSchema_zod_1.loginSchema), authController.loginUser);
    return router;
};
exports.createAuthRouter = createAuthRouter;

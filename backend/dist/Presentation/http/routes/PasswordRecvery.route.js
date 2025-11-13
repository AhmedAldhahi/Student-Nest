"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordRecoveryRouter = void 0;
const express_1 = require("express");
const passwordRecovert_zod_1 = require("../validation/PasswordRecovery/passwordRecovert.zod");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const PasswordRecoveryRouter = (RecoveryPasswordController) => {
    const router = (0, express_1.Router)();
    router.patch("/forget-password", (0, validation_middleware_1.validation)(passwordRecovert_zod_1.ForgetPasswordSchema), RecoveryPasswordController.changeForgetPassword);
    return router;
};
exports.PasswordRecoveryRouter = PasswordRecoveryRouter;

import { Router } from "express";
import { PasswordRecoverController } from "../../controllers/PasswordRecovery.controller";
import { updateForgetPassword } from "../../middlewares/rate-limited/updateForgetPassword.middleware";
import { ForgetPasswordSchema } from "../../validation/PasswordRecovery/passwordRecovert.zod";
import { validation } from "../../middlewares/validation.middleware";

export const PasswordRecoveryRouter = (
  RecoveryPasswordController: PasswordRecoverController
): Router => {
  const router = Router();

  router.patch(
    "/forget-password",
    updateForgetPassword,
    validation(ForgetPasswordSchema),
    RecoveryPasswordController.changeForgetPassword
  );

  return router;
};

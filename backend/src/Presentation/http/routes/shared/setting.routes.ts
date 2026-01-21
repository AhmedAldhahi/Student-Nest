import { Router } from "express";
import { SettingController } from "../../controllers/Shared/Setting.controller";
import { isStudent } from "../../middlewares/auth/isStudent.middleware";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";
import { validation } from "../../middlewares/validation.middleware";
import { whatsappStatusSchema } from "../../validation/shared/settingMangement.validation.zod";

export const SettingRouter = (settingController: SettingController): Router => {
  const router = Router();

  router.patch(
    "/whatsapp-visibility",
    isAuth,
    isStudent,
    validation(whatsappStatusSchema),

    settingController.updateWhatsappVisible,
  );

  return router;
};

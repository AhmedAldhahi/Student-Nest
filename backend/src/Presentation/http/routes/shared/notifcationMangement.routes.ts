import { Router } from "express";
import { NotificationController } from "../../controllers/Shared/Notification.controller";
import { validation } from "../../middlewares/validation.middleware";
import {
  changeNotificationStatusSchema,
  DeleteBatchSchema,
} from "../../validation/shared/notificationMangement.validation.zod";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";

export const notificationRouter = (
  notificationController: NotificationController
): Router => {
  const router = Router();

  router.get("/", isAuth, notificationController.getAllNotification);

  router.patch(
    "/:id/notifications-status/",
    isAuth,

    validation(changeNotificationStatusSchema),
    notificationController.updateNotificationsStatus
  );

  router.delete(
    "/batch",
    isAuth,
    validation(DeleteBatchSchema),

    notificationController.deleteSpecificNotifications
  );

  router.delete("/:id", isAuth, notificationController.deleteNotificationById);

  router.delete("/", isAuth, notificationController.deleteAllNotification);

  return router;
};

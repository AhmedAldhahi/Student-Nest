import { Router } from "express";
import { NotificationController } from "../../controllers/Notification.controller";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";
import { validation } from "../../middlewares/validation.middleware";
import { DeleteBatchSchema } from "../../validation/notificationMangement.validation.zod";

export const notificationRouter = (
  notificationController: NotificationController
): Router => {
  const router = Router();

  router.get(
    "/notifications",
    isAuth,
    notificationController.getAllNotification
  );

  router.patch(
    "/notifications-status/:id",
    isAuth,
    notificationController.updateNotificationsStatus
  );

  router.delete(
    "/notifications/batch",
    isAuth,
    notificationController.deleteSpecificNotifications
  );

  router.delete(
    "/notification/:id",
    isAuth,
    notificationController.deleteNotificationById
  );

  router.delete(
    "/notifications",
    isAuth,
    validation(DeleteBatchSchema),
    notificationController.deleteAllNotification
  );

  return router;
};

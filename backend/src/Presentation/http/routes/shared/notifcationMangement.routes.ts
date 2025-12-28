import { Router } from "express";
import { NotificationController } from "../../controllers/Notification.controller";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";
import { validation } from "../../middlewares/validation.middleware";
import {
  changeNotificationStatusSchema,
  DeleteBatchSchema,
} from "../../validation/notificationMangement.validation.zod";

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
    validation(changeNotificationStatusSchema),
    notificationController.updateNotificationsStatus
  );

  router.delete(
    "/notifications/batch",
    validation(DeleteBatchSchema),
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
    notificationController.deleteAllNotification
  );

  return router;
};

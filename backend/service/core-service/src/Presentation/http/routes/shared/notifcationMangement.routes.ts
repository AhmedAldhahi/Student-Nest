import { Router } from "express";
import { NotificationController } from "../../controllers/Shared/Notification.controller";
import { validation } from "../../middlewares/validation.middleware";
import {
  changeNotificationStatusSchema,
  DeleteBatchSchema,
} from "../../validation/shared/notificationMangement.validation.zod";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";
import { deleteNotificationRateLimit } from "../../middlewares/rate-limited/Notification/deleteNotificationRateLimit.middleware";
import { getNotificationRateLimit } from "../../middlewares/rate-limited/Notification/getNotificationRateLimit.middleware";
import { updateNotificationStatusRateLimit } from "../../middlewares/rate-limited/Notification/updateNotificationStatusRateLimit.middleware";

export const notificationRouter = (
  notificationController: NotificationController,
): Router => {
  const router = Router();

  router.get(
    "/",
    getNotificationRateLimit,
    isAuth,
    notificationController.getAllNotification,
  );

  router.patch(
    "/:id/notifications-status/",
    updateNotificationStatusRateLimit,
    isAuth,

    validation(changeNotificationStatusSchema),
    notificationController.updateNotificationsStatus,
  );

  router.delete(
    "/batch",
    deleteNotificationRateLimit,
    isAuth,
    validation(DeleteBatchSchema),

    notificationController.deleteSpecificNotifications,
  );

  router.delete(
    "/:id",
    deleteNotificationRateLimit,
    isAuth,
    notificationController.deleteNotificationById,
  );

  router.delete(
    "/",
    deleteNotificationRateLimit,
    isAuth,
    notificationController.deleteAllNotification,
  );

  return router;
};

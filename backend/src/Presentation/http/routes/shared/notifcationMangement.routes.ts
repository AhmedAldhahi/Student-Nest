import { Router } from "express";
import { NotificationController } from "../../controllers/Notification.controller";
import { validation } from "../../middlewares/validation.middleware";
import {
  changeNotificationStatusSchema,
  DeleteBatchSchema,
} from "../../validation/notificationMangement.validation.zod";

export const notificationRouter = (
  notificationController: NotificationController
): Router => {
  const router = Router();

  router.get("/", notificationController.getAllNotification);

  router.patch(
    "/:id/notifications-status/",

    validation(changeNotificationStatusSchema),
    notificationController.updateNotificationsStatus
  );

  router.delete(
    "/batch",
    validation(DeleteBatchSchema),

    notificationController.deleteSpecificNotifications
  );

  router.delete("/:id", notificationController.deleteNotificationById);

  router.delete("/", notificationController.deleteAllNotification);

  return router;
};

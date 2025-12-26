import { Router } from "express";
import { NotificationController } from "../../controllers/Notification.controller";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";

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

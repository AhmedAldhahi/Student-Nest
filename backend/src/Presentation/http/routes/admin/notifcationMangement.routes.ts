import { Router } from "express";
import { NotificationController } from "../../controllers/admin/Notification.controller";
import { isAuth } from "../../middlewares/auth/isAuth.middleware";
import { isAdmin } from "../../middlewares/auth/isAdmin.middleware";

export const notificationRouter = (
  notificationController: NotificationController
): Router => {
  const router = Router();

  router.get(
    "/notifications",
    isAuth,
    isAdmin,
    notificationController.getAllNotification
  );

  router.patch("/notifications-status/:id",isAuth,isAdmin,notificationController.updateNotificationsStatus)

  return router;
};

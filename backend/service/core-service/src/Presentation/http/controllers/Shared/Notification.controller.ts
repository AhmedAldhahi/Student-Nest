import { Request, Response } from "express";
import { NotificationContext } from "../../../../Application/BoundedContexts/Shared/Strategy/notification/notificationContext";
import { UpdateNotificationStatusCommandHandler } from "../../../../Application/BoundedContexts/Notification/CommandHandler/updateNotifcationStatusCommandHandler";
import { deleteSpecificNotificationsCommandHandler } from "../../../../Application/BoundedContexts/Notification/CommandHandler/DeleteSpecificationNotificationCommandHandler";

export class NotificationController {
  constructor(
    private readonly UserNotificationContext: NotificationContext,
    private readonly ChangeNotificationStatusCH: UpdateNotificationStatusCommandHandler,
    private readonly deleteSpecificNotificationsCH: deleteSpecificNotificationsCommandHandler
  ) {}

  public getAllNotification = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;

      if (!userId)
        return res.status(400).json({ error: "no user id found !!" });

      const result = await this.UserNotificationContext.executeGetNotifications(
        userId
      );
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(404)
        .json({ error: error.message || "internal server error" });
    }
  };

  public updateNotificationsStatus = async (req: Request, res: Response) => {
    try {
      const { isRead } = req.body;
      const userId = req.user?.userId;
      const { id } = req.params;
      const notificationId = Number(id);

      if (isNaN(notificationId) || notificationId <= 0) {
        return res
          .status(400)
          .json({ error: "Invalid Notification ID format" });
      }

      if (!userId)
        return res.status(400).json({ error: "no user id found !!" });

      const result = await this.ChangeNotificationStatusCH.handle({
        id: notificationId,
        isRead: isRead,
      });

      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server Error" });
    }
  };

  public deleteNotificationById = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;

      if (!userId)
        return res.status(400).json({ error: "no user Id found !!" });

      const { id } = req.params;

      const result =
        await this.UserNotificationContext.executeDeleteNotificationById(
          userId,
          Number(id)
        );
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };

  public deleteAllNotification = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;

      if (!userId)
        return res.status(400).json({ error: "no user id found !!" });

      const result =
        await this.UserNotificationContext.executeDeleteNotifications(userId);
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };

  public deleteSpecificNotifications = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      const body = req.body;

      if (!userId)
        return res.status(400).json({ error: "no user id found !!" });

      const result = await this.deleteSpecificNotificationsCH.handle({
        ids: body.ids,
        userId: userId,
      });
      
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };
}

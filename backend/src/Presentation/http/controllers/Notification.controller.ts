import { Request, Response } from "express";
import { GetAllNotificationUseCase } from "../../../Application/Use-Case/admin/NotifcationMangement/GetAllNotifcation.usecase";
import { UpdateNotificationStatusUseCase } from "../../../Application/Use-Case/admin/NotifcationMangement/UpdateNotifcationStatus.usecase";
import { DeleteNotificationByIdUseCase } from "../../../Application/Use-Case/admin/NotifcationMangement/DeleteNotificationById.usecase";
import { DeleteAllNotificationUseCase } from "../../../Application/Use-Case/admin/NotifcationMangement/DeleteAllNotification.usecase";
import { deleteAllNotification } from "../../../Infrastructure/DI/admin/NotificationManagement";
import { error } from "console";
import { DeleteSpecificNotificationsUseCase } from "../../../Application/Use-Case/admin/NotifcationMangement/DeleteSpecificNotification.usecase";
import { deleteSpecificNotificationsCommand } from "../../../Application/Command/Commands/DeleteSpecficNotificationsCommand";

export class NotificationController {
  constructor(
    private readonly GetAllNotification: GetAllNotificationUseCase,
    private readonly updateNotificationStatus: UpdateNotificationStatusUseCase,
    private readonly DeleteNotificationById: DeleteNotificationByIdUseCase,
    private readonly DeleteAllNotification: DeleteAllNotificationUseCase,
    private readonly DeleteSpecificNotification: DeleteSpecificNotificationsUseCase
  ) {}

  public getAllNotification = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;

      if (!userId)
        return res.status(400).json({ error: "no user id found !!" });

      const result = await this.GetAllNotification.execute(userId);
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

      const result = await this.updateNotificationStatus.execute({
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
      const userId = req.user.userId;

      if (!userId)
        return res.status(400).json({ error: "no user Id found !!" });

      const { id } = req.params;

      const result = await this.DeleteNotificationById.execute(
        Number(id),
        userId
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
      const userId = req.user.userId;

      if (!userId)
        return res.status(400).json({ error: "no user id found !!" });

      const result = await this.DeleteAllNotification.execute(userId);
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };

  public deleteSpecificNotifications = async (req: Request, res: Response) => {
    try {
      const userId = req.user.userId;
      const body = req.body;

      if (!userId)
        return res.status(400).json({ error: "no user id found !!" });

      const result = await this.DeleteSpecificNotification.execute(
        body.ids,
        userId
      );
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: error.message || "internal server error" });
    }
  };
}

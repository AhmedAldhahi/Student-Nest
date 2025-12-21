import { Request, Response } from "express";
import { GetAllNotificationUseCase } from "../../../../Application/Use-Case/admin/NotifcationMangement/GetAllNotifcation.usecase";

export class NotificationController {
  constructor(private readonly GetAllNotification: GetAllNotificationUseCase) {}

  public getAllNotification = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;

      if (!userId)
        return res.status(400).json({ error: "no user id found !!" });

      const result = await this.GetAllNotification.execute();
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(404)
        .json({ error: error.message || "internal server error" });
    }
  };
}

import { INotificationDTO } from "../../../Application/Dtos/admin/NotificationDTO.dtos";
import { IReadNotificationRepositories } from "../../../Domain/Repositories/Read/ReadNotificationRepositories.repositories";
import { AppDataSource } from "../../Database/orm/TypeOrm/data-source";
import { NotificationModel } from "../../Database/orm/TypeOrm/entity/Notifcation.entity";
import { NotificationMapper } from "../mapper/notification.mapper";

export class readNotificationRepositories
  implements IReadNotificationRepositories
{
  public async GetAllNotification(): Promise<INotificationDTO[] | null> {
    try {
      const notification = await AppDataSource.getInstance()
        .getRepository(NotificationModel)
        .find({
          select: {
            notificationId: true,
            message: true,
            title: true,
            isRead: true,
            createAt: true,

            sender: {
              userId: true,
              Name: true,
            },
            receiver: {
              userId: true,
              Name: true,
            },
          },relations: {
            sender: true,
            receiver: true,
          },
        });

      if (!notification || notification.length === 0) return [];

      return notification.map((orm) => {
        return NotificationMapper.toResponse(orm);
      });
    } catch (error: any) {
      console.error("fail to fetch notifications !!");
      throw error;
    }
  }
}

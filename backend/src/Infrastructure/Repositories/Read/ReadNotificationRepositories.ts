import { INotificationDTO } from "../../../Application/DTO/admin/NotificationDTO.dto";
import { NotificationEntity } from "../../../Domain/Entities/NotificationEntity.entity";
import { IReadNotificationRepositories } from "../../../Domain/Repositories/Read/ReadNotificationRepositories.repositories";
import { AppDataSource } from "../../Database/orm/TypeOrm/data-source";
import { NotificationModel } from "../../Database/orm/TypeOrm/entity/Notifcation.entity";
import { NotificationMapper } from "../mapper/notification.mapper";

export class readNotificationRepositories
  implements IReadNotificationRepositories
{
  public async GetAllNotification(
    userId: string
  ): Promise<INotificationDTO[] | null> {
    try {
      console.log("🔍 Repository received userId:", userId);
      const notification = await AppDataSource.getInstance()
        .getRepository(NotificationModel)
        .find({
          where: {
            receiver: {
              userId: userId, // Only get rows where 'receiver' matches this user
            },
          },
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
          },
          relations: {
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

  public async GetNotificationById(
    id: number
  ): Promise<NotificationEntity | null> {
    try {
      const orm = await AppDataSource.getInstance()
        .getRepository(NotificationModel)
        .findOne({
          where: { notificationId: id },
          relations: { sender: true, receiver: true },
        });

      if (!orm) return null;

      return NotificationMapper.toEntity(orm);
    } catch (error: any) {
      console.error("fail to get the notification id : " + id);
      throw error;
    }
  }
public async GetAllAdminNotification(
    userId: string
  ): Promise<INotificationDTO[] | null> {
    try {
      const adminNotifications = await AppDataSource.getInstance()
        .getRepository(NotificationModel)
        .createQueryBuilder("notification")
        .leftJoinAndSelect("notification.receiver", "user") // Existing join
        .leftJoinAndSelect("notification.sender", "sender") // <--- ADD THIS LINE
        .where("user.role = :role", { role: "admin" })
        .getMany();

      if (!adminNotifications || adminNotifications.length === 0) return [];

      return adminNotifications.map((orm) => {
        return NotificationMapper.toResponse(orm);
      });
    } catch (error: any) {
      console.error("fail to get all admin notifications !!");
      throw error;
    }
  }
}

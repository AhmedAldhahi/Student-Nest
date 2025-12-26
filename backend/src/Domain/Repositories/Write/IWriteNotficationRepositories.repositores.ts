import { NotificationEntity } from "../../Entities/NotificationEntity.entity";

export interface IWriteNotificationRepo {
  updateNotification(notification: NotificationEntity): Promise<void>;
  deleteNotificationById(id: number, userId: string): Promise<void>;
  deleteAllNotification(userId: string): Promise<void>;
}

import { NotificationEntity } from "../../Entities/NotificationEntity.entity";

export interface IWriteNotificationRepo {
  updateNotification(notification: NotificationEntity): Promise<void>;
}

import { NotificationEntity } from "../../Entities/Notification.entity";

export interface IWriteNotificationRepo {
  updateNotificationStatus(notification: NotificationEntity): Promise<void>;
}

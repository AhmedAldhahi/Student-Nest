import { NotificationEntity } from "../../Entities/NotificationEntity.entity";

export interface IWriteNotificationRepo {
  updateNotificationStatus(notification: NotificationEntity): Promise<void>;
}

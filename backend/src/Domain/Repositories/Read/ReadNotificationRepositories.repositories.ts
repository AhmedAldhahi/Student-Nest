import { NotificationEntity } from "../../Entities/Notification.entity";

export interface IReadNotificationRepositories {
  GetAllNotification(): Promise<NotificationEntity | null>;
}

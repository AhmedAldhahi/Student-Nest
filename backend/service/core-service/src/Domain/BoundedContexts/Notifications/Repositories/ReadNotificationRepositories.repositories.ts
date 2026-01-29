import { NotificationEntity } from "../Entities/NotificationEntity.entity";
import { INotificationDTO } from "../Representations/INotificationDTO";

export interface IReadNotificationRepositories {
  GetAllNotification(userId: string): Promise<INotificationDTO[] | null>;
  GetNotificationById(id: number): Promise<NotificationEntity | null>;
  GetAllAdminNotification(userId: string): Promise<INotificationDTO[] | null>;
}

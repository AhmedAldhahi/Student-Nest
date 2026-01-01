import { INotificationDTO } from "../../../Application/DTO/admin/NotificationDTO.dto";
import { NotificationEntity } from "../Entities/NotificationEntity.entity";

export interface IReadNotificationRepositories {
  GetAllNotification(userId: string): Promise<INotificationDTO[] | null>;
  GetNotificationById(id: number): Promise<NotificationEntity | null>;
  GetAllAdminNotification(userId: string): Promise<INotificationDTO[] | null>;
}

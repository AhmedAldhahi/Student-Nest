import { INotificationDTO } from "../../../Application/Dtos/admin/NotificationDTO.dtos";
import { NotificationEntity } from "../../Entities/NotificationEntity.entity";

export interface IReadNotificationRepositories {
  GetAllNotification(userId: string): Promise<INotificationDTO[] | null>;
  GetNotificationById(id: number): Promise<NotificationEntity | null>;
}

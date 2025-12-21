import { INotificationDTO } from "../../../Application/Dtos/admin/NotificationDTO.dtos";

export interface IReadNotificationRepositories {
  GetAllNotification(): Promise<INotificationDTO[] | null>;
}

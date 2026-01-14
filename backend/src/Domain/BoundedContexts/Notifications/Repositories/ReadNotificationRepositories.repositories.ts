import { UserResponseDTO } from "../../IdentityAndAccess/Repositories/ReadStudentRepositories.repositories";
import { NotificationEntity } from "../Entities/NotificationEntity.entity";

export interface INotificationDTO {
  notifyId: number;
  createAt: Date;
  message: string;
  title: string;
  isRead: boolean;
  receiver: UserResponseDTO;
}
export interface IReadNotificationRepositories {
  GetAllNotification(userId: string): Promise<INotificationDTO[] | null>;
  GetNotificationById(id: number): Promise<NotificationEntity | null>;
  GetAllAdminNotification(userId: string): Promise<INotificationDTO[] | null>;
}

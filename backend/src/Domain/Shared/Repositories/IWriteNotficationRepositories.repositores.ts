import { NotificationEntity } from "../Entities/NotificationEntity.entity";
import { UserRole } from "../Enum/UserRole.enum";

export interface IWriteNotificationRepo {
  createNotification(notification: NotificationEntity): Promise<void>;
  updateNotification(notification: NotificationEntity): Promise<void>;
  deleteNotificationById(id: number, userId: string): Promise<void>;
  deleteAllNotification(userId: string): Promise<void>;
  deleteSpecificNotifications(ids: number[], userId: string): Promise<void>;

  deleteAdminNotificationById(userId: string, id: number): Promise<void>;
  deleteAllAdminNotification(userId: string, role: UserRole): Promise<void>;
}

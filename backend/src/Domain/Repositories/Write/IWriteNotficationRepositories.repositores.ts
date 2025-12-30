import { NotificationEntity } from "../../Entities/NotificationEntity.entity";
import { UserRole } from "../../Enum/UserRole.enum";

export interface IWriteNotificationRepo {
  updateNotification(notification: NotificationEntity): Promise<void>;
  deleteNotificationById(id: number, userId: string): Promise<void>;
  deleteAllNotification(userId: string): Promise<void>;
  deleteAllAdminNotification(userId: string, role: UserRole): Promise<void>;
  deleteSpecificNotifications(ids: number[], userId: string): Promise<void>;
}

import { UserRole } from "../../../Domain/Shared/Enum/UserRole.enum";
import { AdminNotificationsStrategy } from "./AdminNotification.strategy";
import { INotificationsStrategy } from "./Inotification.strategy";
import { UserNotificationsStrategy } from "./UserNotifications.strategy";

export class NotificationContext {
  constructor(
    private readonly userNotificationStrategy: UserNotificationsStrategy,
    private readonly adminNotificationStrategy: AdminNotificationsStrategy
  ) {}

  public async executeGetNotifications(
    userId: string,
    role: UserRole
  ): Promise<any> {
    let strategy: INotificationsStrategy;

    switch (role) {
      case UserRole.admin:
        strategy = this.adminNotificationStrategy;
        break;

      case UserRole.landlord:
      case UserRole.student:
        strategy = this.userNotificationStrategy;
        break;

      default:
        throw new Error("Invalid User Role");
    }

    return await strategy.UserNotifications(userId);
  }

  public async executeDeleteNotifications(
    userId: string,
    role: UserRole
  ): Promise<any> {
    let strategy: INotificationsStrategy;

    switch (role) {
      case UserRole.admin:
        strategy = this.adminNotificationStrategy;
        break;

      case UserRole.landlord:
      case UserRole.student:
        strategy = this.userNotificationStrategy;
        break;

      default:
        throw new Error("Invalid User Role");
    }

    return await strategy.DeleteAllNotifications(userId);
  }

  public async executeDeleteNotificationById(
    userId: string,
    role: UserRole,
    id: number
  ) {
    let strategy: INotificationsStrategy;

    switch (role) {
      case UserRole.admin:
        strategy = this.adminNotificationStrategy;
        break;

      case UserRole.landlord:
      case UserRole.student:
        strategy = this.userNotificationStrategy;
        break;

      default:
        throw new Error("Invalid User Role");
    }

    return await strategy.DeleteNotificationById(userId, id);
  }
}

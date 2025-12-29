import { UserRole } from "../../../Domain/Enum/UserRole.enum";
import { AdminNotificationsStrategy } from "./AdminNotification.strategy";
import { INotificationsStrategy } from "./Inotification.strategy";
import { UserNotificationsStrategy } from "./UserNotifications.strategy";

export class NotificationContext {
  constructor(
    private readonly userNotificationStrategy: UserNotificationsStrategy,
    private readonly adminNotificationStrategy: AdminNotificationsStrategy
  ) {}

  public async execute(userId: string, role: UserRole): Promise<any> {
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
}

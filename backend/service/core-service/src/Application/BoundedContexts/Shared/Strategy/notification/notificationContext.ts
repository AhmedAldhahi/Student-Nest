import { UserRole } from "../../../../../Domain/BoundedContexts/IdentityAndAccess/Enum/UserRole.enum";
import { IReadUserRepositories } from "../../../../../Domain/BoundedContexts/IdentityAndAccess/Repositories/ReadUserRepositories.repositories";
import { AdminNotificationsStrategy } from "./AdminNotification.strategy";
import { INotificationsStrategy } from "./INotification.strategy";
import { UserNotificationsStrategy } from "./UserNotifications.strategy";

export class NotificationContext {
  constructor(
    private readonly userNotificationStrategy: UserNotificationsStrategy,
    private readonly adminNotificationStrategy: AdminNotificationsStrategy,
    private readonly readUserRepo: IReadUserRepositories
  ) {}

  public async executeGetNotifications(userId: string): Promise<any> {
    let strategy: INotificationsStrategy;
    const role = await this.getUserRole(userId);

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

  public async executeDeleteNotifications(userId: string): Promise<any> {
    let strategy: INotificationsStrategy;
    const role = await this.getUserRole(userId);
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

  public async executeDeleteNotificationById(userId: string, id: number) {
    let strategy: INotificationsStrategy;
    const role = await this.getUserRole(userId);

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

  private async getUserRole(userId: string): Promise<UserRole> {
    try {
      const user = await this.readUserRepo.findById(userId);
      if (!user) throw new Error("no user been found !!");

      return user.getRole();
    } catch (error: any) {
      console.error("no role been found !!", error);
      throw error;
    }
  }
}

import { EntityManager, In } from "typeorm";
import { IWriteNotificationRepo } from "../../../Domain/BoundedContexts/Notifications/Repositories/IWriteNotficationRepositories.repositores";
import { NotificationMapper } from "../mapper/notification.mapper";
import { NotificationModel } from "../../Database/TypeOrm/entity/Notifcation.entity";
import { UserRole } from "../../../Domain/BoundedContexts/IdentityAndAccess/Enum/UserRole.enum";
import { AppDataSource } from "../../Database/TypeOrm/data-source";
import { UserModel } from "../../Database/TypeOrm/entity/User.entity";
import { NotificationEntity } from "../../../Domain/BoundedContexts/Notifications/Entities/NotificationEntity.entity";

export class WriteNotificationRepositories implements IWriteNotificationRepo {
  private manager: EntityManager;

  constructor(manager: EntityManager) {
    this.manager = manager;
  }
  
  public async createNotification(notification: NotificationEntity): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async deleteAdminNotificationById(
    userId: string,
    id: number
  ): Promise<void> {
    try {
      const userRepo = this.manager.getRepository(UserModel);
      const adminUsers = await userRepo.find({
        where: { Role: UserRole.admin },
        select: { userId: true }, // Optimization: Select only IDs
      });

      const adminIds = adminUsers.map((user) => user.userId);

      if (adminIds.length === 0) {
        throw new Error("No admin users found in the system.");
      }
      // Step 2: Delete the notification ONLY IF:
      // A. The Notification ID matches
      // B. The ReceiverId is inside the list of Admin IDs
      const result = await this.manager
        .createQueryBuilder()
        .delete()
        .from(NotificationModel)
        .where("notificationId = :id", { id })
        .andWhere("receiverId IN (:...adminIds)", { adminIds }) // Checks if owner is ANY admin
        .execute();

      // Step 3: Check if anything was actually deleted
      if (result.affected === 0) {
        throw new Error(
          "OPERATION_FAILED: Notification not found, or it does not belong to an Admin account."
        );
      }
    } catch (error: any) {
      console.error("fail to delete admin notifications !!");
      throw error;
    }
  }

  public async deleteAllAdminNotification(
    userId: string,
    role: UserRole
  ): Promise<void> {
    try {
      const notificationRepo =
        AppDataSource.getInstance().getRepository(NotificationModel);

      // CASE 1: ADMIN (Delete notifications for ME and ALL OTHER ADMINS)
      if (role === UserRole.admin) {
        // Step A: Find all users who have the 'admin' role
        const userRepo = AppDataSource.getInstance().getRepository(UserModel);
        const allAdmins = await userRepo.find({
          where: { Role: UserRole.admin },
          select: { userId: true }, // We only need the IDs
        });

        const adminIds = allAdmins.map((user) => user.userId);

        if (adminIds.length > 0) {
          await notificationRepo.delete({
            receiver: { userId: In(adminIds) },
          });
        }
      }
    } catch (error: any) {
      console.error("Failed to delete notifications:", error);
      throw new Error("Could not delete notifications.");
    }
  }

  public async deleteNotificationById(
    id: number,
    userId: string
  ): Promise<void> {
    const result = await this.manager
      .createQueryBuilder()
      .delete()
      .from(NotificationModel)
      .where("notificationId = :id", { id })
      .andWhere("receiverId = :userId", { userId })
      .execute();

    if (result.affected === 0) {
      throw new Error(
        "OPERATION_FAILED: Notification not found or you don't own it."
      );
    }
  }

  public async deleteAllNotification(userId: string): Promise<void> {
    await this.manager
      .createQueryBuilder()
      .delete()
      .from(NotificationModel)
      .where("receiverId = :userId", { userId }) // Strict safety check
      .execute();
  }

  public async updateNotification(
    notification: NotificationEntity
  ): Promise<void> {
    const model = NotificationMapper.toModel(notification);
    await this.manager.save(NotificationModel, model);
  }

  public async deleteSpecificNotifications(
    ids: number[],
    userId: string
  ): Promise<void> {
    // 1. Optimization: If the array is empty, do nothing to avoid DB errors
    if (!ids || ids.length === 0) {
      return;
    }

    // 2. Use QueryBuilder with IN operator
    await this.manager
      .createQueryBuilder()
      .delete()
      .from(NotificationModel)
      .where("notificationId IN (:...ids)", { ids })
      .andWhere("receiverId = :userId", { userId })
      .execute();
  }
}

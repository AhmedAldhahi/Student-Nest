import { EntityManager, In } from "typeorm";
import { NotificationEntity } from "../../../Domain/Entities/NotificationEntity.entity";
import { IWriteNotificationRepo } from "../../../Domain/Repositories/Write/IWriteNotficationRepositories.repositores";
import { NotificationMapper } from "../mapper/notification.mapper";
import { NotificationModel } from "../../Database/orm/TypeOrm/entity/Notifcation.entity";
import { UserRole } from "../../../Domain/Enum/UserRole.enum";
import { AppDataSource } from "../../Database/orm/TypeOrm/data-source";
import { UserModel } from "../../Database/orm/TypeOrm/entity/User.entity";

export class WriteNotificationRepositories implements IWriteNotificationRepo {
  private manager: EntityManager;

  constructor(manager: EntityManager) {
    this.manager = manager;
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
      throw new Error("Notification not found or access denied.");
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

import { EntityManager } from "typeorm";
import { NotificationEntity } from "../../../Domain/Entities/NotificationEntity.entity";
import { IWriteNotificationRepo } from "../../../Domain/Repositories/Write/IWriteNotficationRepositories.repositores";
import { NotificationMapper } from "../mapper/notification.mapper";
import { NotificationModel } from "../../Database/orm/TypeOrm/entity/Notifcation.entity";

export class WriteNotificationRepositories implements IWriteNotificationRepo {
  private manager: EntityManager;

  constructor(manager: EntityManager) {
    this.manager = manager;
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
}

import { EntityManager } from "typeorm";
import { NotificationEntity } from "../../../Domain/Entities/NotificationEntity.entity";
import { IWriteNotificationRepo } from "../../../Domain/Repositories/Write/IWriteUpdateNotficationStatusRepositories.repositores";
import { WriteUserRepositories } from "./WriteUserRepositories";
import { NotificationMapper } from "../mapper/notification.mapper";
import { NotificationModel } from "../../Database/orm/TypeOrm/entity/Notifcation.entity";

export class WriteNotificationRepositories implements IWriteNotificationRepo {
  private manager: EntityManager;
  private writeUserRepo: WriteUserRepositories;

  constructor(manager: EntityManager) {
    this.manager = manager;
    this.writeUserRepo = new WriteUserRepositories(manager);
  }

  public async updateNotificationStatus(
    notification: NotificationEntity
  ): Promise<void> {
    const model = NotificationMapper.toModel(notification);
    await this.manager.save(NotificationModel, model);
  }
}

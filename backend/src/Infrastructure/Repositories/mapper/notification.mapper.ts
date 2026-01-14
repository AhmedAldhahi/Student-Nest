import { NotificationEntity } from "../../../Domain/BoundedContexts/Notifications/Entities/NotificationEntity.entity";
import { INotificationDTO } from "../../../Domain/BoundedContexts/Notifications/Repositories/ReadNotificationRepositories.repositories";
import { NotificationModel } from "../../Database/TypeOrm/entity/Notifcation.entity";
import { UserMapper } from "./user.mapper";

export class NotificationMapper {
  public static toModel(entity: NotificationEntity): NotificationModel {
    const notificationModel = new NotificationModel();

    notificationModel.createAt = entity.getCreateAt();
    notificationModel.notificationId = entity.getNotificationId();
    notificationModel.message = entity.getMessage();
    notificationModel.title = entity.getTitle();
    notificationModel.isRead = entity.getIsRead();
    notificationModel.receiver = UserMapper.toOrm(entity.getReceiver());

    return notificationModel;
  }

  public static toEntity(model: NotificationModel): NotificationEntity {
    return new NotificationEntity({
      notifyId: model.notificationId,
      createAt: model.createAt,
      message: model.message,
      title: model.title,
      isRead: model.isRead,
      receiver: UserMapper.toEntity(model.receiver),
    });
  }

  public static toResponse(model: NotificationModel): INotificationDTO {
    return {
      notifyId: model.notificationId,
      createAt: model.createAt,
      message: model.message,
      title: model.title,
      isRead: model.isRead,
      receiver: UserMapper.toUserResponse(model.receiver),
    };
  }
}

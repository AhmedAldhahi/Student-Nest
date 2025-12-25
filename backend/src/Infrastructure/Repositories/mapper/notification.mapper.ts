import { INotificationDTO } from "../../../Application/DTO/admin/NotificationDTO.dtos";
import { UserResponseDTO } from "../../../Application/DTO/profile/ UserResponseDTO";
import { NotificationEntity } from "../../../Domain/Entities/NotificationEntity.entity";
import { UserEntity } from "../../../Domain/Entities/userEntity.entity";
import { NotificationModel } from "../../Database/orm/TypeOrm/entity/Notifcation.entity";
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

    const senderEntity = entity.getSender();
    notificationModel.sender = senderEntity
      ? UserMapper.toOrm(senderEntity)
      : null;

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
      sender: model.sender ? UserMapper.toEntity(model.sender) : undefined,
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
      sender: model.sender ? UserMapper.toUserResponse(model.sender) : undefined,
    };
  }
}


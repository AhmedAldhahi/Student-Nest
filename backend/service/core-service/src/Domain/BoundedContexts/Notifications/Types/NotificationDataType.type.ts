import { UserEntity } from "../../IdentityAndAccess/Entities/userEntity.entity";

export type NotificationDataType = {
  notifyId: number
  message: string
  title: string
  isRead: boolean
  createAt: Date
  receiver: UserEntity
};

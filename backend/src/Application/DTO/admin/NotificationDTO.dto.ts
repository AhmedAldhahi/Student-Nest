import { UserResponseDTO } from "../profile/ UserResponseDTO";

export interface INotificationDTO {
  notifyId: number;
  createAt: Date;
  message: string;
  title: string;
  isRead: boolean;
  receiver: UserResponseDTO;
}

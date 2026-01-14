import { UserEntity } from "../../IdentityAndAccess/Entities/userEntity.entity";
import { NotificationDataType } from "../Types/NotificationDataType.type";

export class NotificationEntity {
  private notifyId: number;
  private message: string;
  private title: string;
  private isRead: boolean = false;
  private createAt: Date;
  private receiver: UserEntity;

  constructor(data: NotificationDataType) {
    this.notifyId = data.notifyId;
    this.message = data.message;
    this.title = data.title;
    this.isRead = data.isRead;
    this.createAt = data.createAt;
    this.receiver = data.receiver;
  }

  public setNotificationId(id: number): void {
    this.notifyId = id;
  }

  public getNotificationId(): number {
    return this.notifyId;
  }

  public setMessage(message: string): void {
    this.message = message;
  }

  public getMessage(): string {
    return this.message;
  }

  public setTitle(title: string): void {
    this.title = title;
  }

  public getTitle(): string {
    return this.title;
  }

  public setIsRead(read: boolean): void {
    this.isRead = read;
  }

  public getIsRead(): boolean {
    return this.isRead;
  }

  public markAsNotRead(): void {
    this.isRead = false;
  }

  public markAsRead(): void {
    this.isRead = true;
  }

  public getCreateAt(): Date {
    return this.createAt;
  }

  public getReceiver(): UserEntity {
    return this.receiver;
  }
}

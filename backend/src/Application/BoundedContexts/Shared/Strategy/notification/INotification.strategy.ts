export interface INotificationsStrategy {
  UserNotifications(userId: string): Promise<any>;
  DeleteAllNotifications(userId: string): Promise<any>;
  DeleteNotificationById(userId: string, id: number): Promise<any>;
}

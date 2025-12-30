export interface INotificationsStrategy {
  UserNotifications(userId: string): Promise<any>;
  DeleteAllNotifications(userId: string): Promise<any>;
}

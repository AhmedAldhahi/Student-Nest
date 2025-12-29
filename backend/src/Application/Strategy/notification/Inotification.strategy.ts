export interface INotificationsStrategy {
  UserNotifications(userId: string): Promise<any>;
}
